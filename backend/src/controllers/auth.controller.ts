import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repo";
import { UserLoginDTO } from "../dtos/userLogin.dto";



export const userLogin = async (req: Request, res: Response) => {

  try {
    console.log("inside login ",req.body)
    const { email, password }:UserLoginDTO = req.body;
    console.log(email, password)
    const token = await loginUser(email, password, 'user',new UserRepository);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};