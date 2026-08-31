import { RegisterDTO, LoginDTO, LoginResponseDTO } from "../../dtos/auth.dto";
import { User } from "../../models/User";

export interface IAuthService {
  register(data: RegisterDTO): Promise<User>;
  login(data: LoginDTO): Promise<LoginResponseDTO>;
}
