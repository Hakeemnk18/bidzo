import { AuthenticatedRequest } from "../../../interfaces/AuthenticatedRequest";
import { Request,Response } from "express";

export interface IAuctioncontroller {
    createAuction(req: AuthenticatedRequest, res: Response):Promise<void>
    allProduct(req: AuthenticatedRequest, res: Response): Promise<void>
    allAuctions(req: AuthenticatedRequest,res: Response): Promise<void>
}