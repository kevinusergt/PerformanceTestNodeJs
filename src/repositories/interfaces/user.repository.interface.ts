import { User, UserCreationAttributes } from "../../models/User";

export interface IUserRepository {
  create(data: UserCreationAttributes): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
}
