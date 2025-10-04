import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../interfaces/AuthenticatedRequest";

export interface IUserSubscriptionController {
    getPlans(req: AuthenticatedRequest, res: Response): Promise<void>
    createRazorpayOrder(req: Request, res: Response): Promise<void>
}