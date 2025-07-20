import { UserRepository } from "../repositories/user.repo";
import { IUserRepository } from "../repositories/user.repo.interface";



export const loginUser = async (
  email: string, 
  password: string, 
  role: string,
  repo: IUserRepository
) => {
  const user = await repo.findByEmail(email,role);
  if (!user) throw new Error("Invalid credentials");
};
