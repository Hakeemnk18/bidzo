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

  async findByEmail(email: string, role: string): Promise<User | null> {

    console.log("email ",email)
    console.log("role ",role)
    return await UserModel.findOne({ email,role });
  }
}