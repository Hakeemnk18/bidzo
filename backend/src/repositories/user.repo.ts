import UserModel from "../models/userModel";
import { IUserRepository } from "./user.repo.interface";
import { User } from "../types/userType";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  async findByEmail(email: string, role?:string): Promise<User | null> {
    const query:any = { email }
    if(role) query.role = { role }
    return await UserModel.findOne({ query });
  }
}