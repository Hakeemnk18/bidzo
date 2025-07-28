import { User } from "../types/userType";
import { CreateGoogleUserDTO } from "../dtos/userLogin.dto";

export interface IUserRepository {
  create(user: User): Promise<User>;
  createGoogleUser(user: CreateGoogleUserDTO): Promise<User>;
  findByEmailAndRole(email: string,role: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}