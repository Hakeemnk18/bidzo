import { Request, Response } from "express";
import { IPlanController } from "./interfaces/plan.management.interface";
import { inject, injectable } from "tsyringe";
import { IPlanService } from "../../services/interfaces/plan.interface";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { success } from "zod";
import { handleError } from "../../utils/customError";
import { ICreatePlanDto } from "../../dtos/plan.dto";
import { PlanMapper } from "../../mappers/plan.mapper";


@injectable()
export class PlanMangementController implements IPlanController {
    constructor(
        @inject('IPlanService')  private readonly planService: IPlanService
    ){}
    async createPlan(req: Request, res: Response): Promise<void> {
        try {
            console.log("inside plan create controller")
            console.log(req.body)
            const planData = PlanMapper.toCreatePlanDTO(req.body)
            console.log(planData)
            await this.planService.creat(planData)

            res.status(HttpStatusCode.OK).json({
                success: true
            })
        } catch (err) {
            console.log("error in plane create contoller ",err)
            handleError(res, err)
        }
    }
}