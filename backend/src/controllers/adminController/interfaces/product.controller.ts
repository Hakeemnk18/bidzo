import { Request, Response } from "express"

export interface IProductController {
    getAllProduct(req: Request, res: Response): Promise<void>
    blockAndUnblock(req: Request, res: Response): Promise<void>
}