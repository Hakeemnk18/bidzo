import { Request, Response } from "express"

export interface IUserManagement {
    getUser(req: Request, res: Response):Promise<void>
    getSeller(req: Request, res: Response):Promise<void>
    blockAndUnblock(req: Request, res: Response): Promise<void>
    approveSeller(req: Request, res: Response): Promise<void>
}