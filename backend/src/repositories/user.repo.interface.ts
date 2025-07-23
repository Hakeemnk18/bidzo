import { User } from "../types/userType";
import { CreateGoogleUserDTO } from "../dtos/userLogin.dto";

export interface IUserRepository {
  create(user: User): Promise<User>;
  createGoogleUser(user: CreateGoogleUserDTO): Promise<User>;
  findByEmail(email: string,role: string): Promise<User | null>;
}