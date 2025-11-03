import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../interfaces/AuthenticatedRequest";

export interface IBidController {
    create(req: AuthenticatedRequest, res: Response): Promise<void>
}