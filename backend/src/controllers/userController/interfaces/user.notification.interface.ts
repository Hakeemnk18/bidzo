import { AuthenticatedRequest } from "../../../interfaces/AuthenticatedRequest";
import { Request, Response } from "express";


export interface IUserNotificationController {
    getAll(req: AuthenticatedRequest,res: Response):Promise<void>
    markAsRead(req: Request, res: Response): Promise<void>
}