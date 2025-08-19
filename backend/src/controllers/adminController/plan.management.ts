import { Request, Response } from "express";
import { IPlanController } from "./interfaces/plan.management.interface";
import { inject, injectable } from "tsyringe";
import { IPlanService } from "../../services/interfaces/plan.interface";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { success } from "zod";
import { handleError } from "../../utils/customError";
import { CreatePlanDto } from "../../dtos/plan.dto";


@injectable()
export class PlanMangementController implements IPlanController {
    constructor(
        @inject('IPlanService')  private readonly planService: IPlanService
    ){}
    async createPlan(req: Request, res: Response): Promise<void> {
        try {
            console.log("inside plan create controller")
            console.log(req.body)
            const { planName, yearlyAmount, monthlyAmount, target, features } = req.body
            const arrFeatures = features.split(',')
            const planData: CreatePlanDto = {
                planName: planName,
                yearlyAmount: parseInt(yearlyAmount),
                monthlyAmount: parseInt(monthlyAmount),
                target: target,
                features: arrFeatures
            }

            await this.planService.creat(planData)

            res.status(HttpStatusCode.OK).json({
                success: true
            })
        } catch (err) {
            console.log("error in plana create contoller")
            handleError(res, err)
        }
    }
}