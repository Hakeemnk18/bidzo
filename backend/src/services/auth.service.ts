import { UserRepository } from "../repositories/user.repo";

const repo = new UserRepository()

export const loginUser = async (email: string, password: string, role:string) => {
  const user = await repo.findByEmail(email,role);
  if (!user) throw new Error("Invalid credentials");
};