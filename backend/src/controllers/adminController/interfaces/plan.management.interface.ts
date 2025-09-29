import { Request, Response } from "express"

export interface IPlanController {
    createPlan(req: Request, res: Response): Promise<void>
    getPlans(req: Request, res: Response): Promise<void>
    blockAndUnblockPlan(req: Request, res:Response): Promise<void>
    getPlan(req: Request, res: Response): Promise<void>
    editPlan(req: Request, res: Response): Promise<void>
    planName(req: Request, res: Response): Promise<void>
}