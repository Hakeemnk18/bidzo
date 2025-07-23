import { Request, Response } from "express";

export interface IAuthController {
  googleLogin(req: Request, res: Response): Promise<void>;
}