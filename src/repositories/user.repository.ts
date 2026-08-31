import { User, UserCreationAttributes } from "../models/User";
import { IUserRepository } from "./interfaces/user.repository.interface";

export class UserRepository implements IUserRepository {
  async create(data: UserCreationAttributes): Promise<User> {
    return User.create(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }
}
