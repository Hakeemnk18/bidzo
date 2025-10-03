import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../interfaces/AuthenticatedRequest";

export interface IUserSubscriptionController {
    getPlans(req: Request, res: Response): Promise<void>
}