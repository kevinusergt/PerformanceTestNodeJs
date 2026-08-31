import { UserRole } from "../models/User";

// El registro es libre: el propio usuario decide su rol (así lo pide el enunciado)
export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole; // "ADMIN" | "GESTOR"
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  };
}
