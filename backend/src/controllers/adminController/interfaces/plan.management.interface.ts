import { Request, Response } from "express"

export interface IPlanController {
    createPlan(req: Request, res: Response): Promise<void>
    getPlans(req: Request, res: Response): Promise<void>
    blockAndUnblockPlan(req: Request, res:Response): Promise<void>
}