import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";



export const userLogin = async (req: Request, res: Response) => {

  try {
    console.log("inside login ",req.body)
    const { email, password } = req.body;
    const token = await loginUser(email, password, 'user');
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};