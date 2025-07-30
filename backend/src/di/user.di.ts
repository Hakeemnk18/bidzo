import { UserRepository } from "../repositories/user.repo";
import { UserMangementService } from "../services/user.management,service";


const userRepo = new UserRepository()
export const userService = new UserMangementService(userRepo)