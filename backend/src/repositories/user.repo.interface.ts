import { User } from "../types/userType";
import { CreateGoogleUserDTO } from "../dtos/userLogin.dto";


export interface IUserRepository {
  create(user: User): Promise<User>;
  createGoogleUser(user: CreateGoogleUserDTO): Promise<User>;
  findByEmailAndRole(email: string,role: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAllUser(query: Record<string, any>, page: number, limit: number, sort: Record<string, any>): Promise<User[]>;
  countDocument(query: Record<string, any>): Promise<number>;
}