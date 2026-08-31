import bcrypt from "bcryptjs";
import { IAuthService } from "./interfaces/auth.service.interface";
import { IUserRepository } from "../repositories/interfaces/user.repository.interface";
import { RegisterDTO, LoginDTO, LoginResponseDTO } from "../dtos/auth.dto";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  // Registro SIN restricción de rol: el usuario elige si es ADMIN o GESTOR.
  // El enunciado pide explícitamente que este endpoint solo valide datos,
  // sin control de JWT ni de rol.
  async register(data: RegisterDTO): Promise<User> {
    if (!data.name || !data.email || !data.password || !data.role) {
      throw new AppError("Nombre, email, password y role son obligatorios.", 400);
    }
    if (data.role !== "ADMIN" && data.role !== "GESTOR") {
      throw new AppError("El rol debe ser ADMIN o GESTOR.", 400);
    }

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("El email ya está registrado.", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });
  }

  async login(data: LoginDTO): Promise<LoginResponseDTO> {
    if (!data.email || !data.password) {
      throw new AppError("Email y password son obligatorios.", 400);
    }

    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError("Credenciales incorrectas.", 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Credenciales incorrectas.", 401);
    }

    const token = generateToken({ id: user.id, role: user.role });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }
}
