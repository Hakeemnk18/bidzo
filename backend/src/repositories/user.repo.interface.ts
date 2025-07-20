import { User } from "../types/userType";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string,role: string): Promise<User | null>;
}