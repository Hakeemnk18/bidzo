import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { IUserSubscriptionController} from "./interfaces/user.subscription.interface";
import { inject, injectable } from "tsyringe";
import { IPlanRepo } from "../../repositories/interfaces/plan.repo.interface";
import { handleError } from "../../utils/customError";
import { IPlanService } from "../../services/interfaces/plan.interface";
import { PlanMapper } from "../../mappers/plan.mapper";
import { IResGetPlan } from "../../dtos/plan.dto";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";


@injectable()
export class UserSubscriptionController implements IUserSubscriptionController {
    constructor(
        @inject('IPlanService')private readonly planService: IPlanService
    ){}

    async getPlans(req: Request, res: Response): Promise<void> {
        try {
            const allPlans = await this.planService.findPlans("user")
            const plans: IResGetPlan[] = PlanMapper.toPlanResponseDTO(allPlans)
            res.status(HttpStatusCode.OK).json({
                message: ResponseMessages.SUCCESS,
                success: true,
                data: plans
            })
        
        } catch (error) {
            handleError(res,error)
            console.log("error in get plans controller ",error)
        }
    }
}