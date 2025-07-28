import { Request, Response } from "express";

export interface IAuthController {
  loginUser(req: Request, res: Response): Promise<void>
  googleLogin(req: Request, res: Response): Promise<void>;
  signUp(req: Request, res: Response): Promise<void>;
  sendOTP(req: Request, res: Response): Promise<void>;
  verifyOTP(req: Request, res: Response): Promise<void>
}