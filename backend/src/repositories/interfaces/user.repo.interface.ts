import { User } from "../../types/userType";
import { CreateGoogleUserDTO } from "../../dtos/userLogin.dto";
import { UpdateResult } from "mongoose";


export interface IUserRepository {
  create(user: User): Promise<User>;
  createGoogleUser(user: CreateGoogleUserDTO): Promise<User>;
  findByEmailAndRole(email: string,role: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAllUser(query: Record<string, any>, page: number, limit: number, sort: Record<string, any>): Promise<User[]>;
  countDocument(query: Record<string, any>): Promise<number>;
  findByidAndUpdate(id: string,query: Record< string, any >): Promise<UpdateResult>
  findById(id: string): Promise<User | null >
  resetPassword(id: string, password: string): Promise<User | null>
  findOne(query: Record<string, any>): Promise<User | null>
}