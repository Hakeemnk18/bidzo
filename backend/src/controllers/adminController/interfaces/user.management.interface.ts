import { Request, Response } from "express"

export interface IUserManagement {
    getUser(req: Request, res: Response):Promise<void>
    getSeller(req: Request, res: Response):Promise<void>
}