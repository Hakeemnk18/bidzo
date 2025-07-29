import { Request, Response } from "express";

export interface ISellerAuthController {
    signup(req: Request, res: Response): Promise<void>
}

