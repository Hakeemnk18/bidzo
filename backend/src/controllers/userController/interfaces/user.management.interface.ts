import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../interfaces/AuthenticatedRequest";

export interface IUserManagement {
    getUser(req: AuthenticatedRequest,res: Response): Promise<void>
    editUser(req: AuthenticatedRequest, res: Response): Promise<void>
    checkPassword(req: AuthenticatedRequest, res: Response): Promise<void>
    changePassword(req: AuthenticatedRequest, res:Response): Promise<void>
}