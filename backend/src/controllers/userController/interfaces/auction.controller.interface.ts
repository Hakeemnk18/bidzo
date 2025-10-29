import { Request, Response } from "express"
export interface IAuctionUserController {
    getAllAuctions(req: Request, res: Response): Promise<void>
}