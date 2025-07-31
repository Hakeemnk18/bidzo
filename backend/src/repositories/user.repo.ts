import UserModel from "../models/userModel";
import { IUserRepository } from "./user.repo.interface";
import { User } from "../types/userType";
import { CreateGoogleUserDTO } from "../dtos/userLogin.dto";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  async createGoogleUser(user: CreateGoogleUserDTO): Promise<User> {
    return await UserModel.create(user);
  }

  async findByEmail(email: string, ): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async findByEmailAndRole(email: string, role: string): Promise<User | null> {
     return await UserModel.findOne({ email,role });
  }

  async findAllUser(query: Record<string, any>, page: number, limit: number, sort:Record<string, any>): Promise<User[]> {
    const skip =  (page - 1) * limit;
    return await UserModel.find(query).skip(skip).limit(limit).sort(sort).collation({ locale: 'en', strength: 1 })
  }

  async countDocument(query: any): Promise<number> {
    
    return await UserModel.countDocuments(query)
  }
}