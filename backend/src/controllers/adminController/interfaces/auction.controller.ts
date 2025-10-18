import { Request, Response } from "express";

export interface IAuctionAdminController {
    getAllAuction(req: Request, res: Response): Promise<void>
    deleteAuction(req : Request, res: Response): Promise<void>
    unBlockAuction(req: Request, res: Response): Promise<void>
}