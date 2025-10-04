import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { IUserSubscriptionController } from "./interfaces/user.subscription.interface";
import { inject, injectable } from "tsyringe";
import { IPlanRepo } from "../../repositories/interfaces/plan.repo.interface";
import { handleError } from "../../utils/customError";
import { IPlanService } from "../../services/interfaces/plan.interface";
import { PlanMapper } from "../../mappers/plan.mapper";
import { IResGetPlan } from "../../dtos/plan.dto";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";
import { CustomError } from "../../utils/customError";
import { ISubscriptionService } from "../../services/interfaces/subscription.interface";


@injectable()
export class UserSubscriptionController implements IUserSubscriptionController {
    constructor(
        @inject('IPlanService') private readonly planService: IPlanService,
        @inject('ISubscriptionService') private readonly subscriptionService: ISubscriptionService
    ) { }

    async getPlans(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { user } = req
            if (!user) {
                throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND)
            }
            const allPlans = await this.planService.findPlans(user.role)
            const plans: IResGetPlan[] = PlanMapper.toPlanResponseDTO(allPlans)
            res.status(HttpStatusCode.OK).json({
                message: ResponseMessages.SUCCESS,
                success: true,
                data: plans
            })

        } catch (error) {
            handleError(res, error)
            console.log("error in get plans controller ", error)
        }
    }

    async createRazorpayOrder(req: Request, res: Response): Promise<void> {
        try {
            const { planId, billing} = req.body
            const order = await this.subscriptionService.createRazorpayOrder(planId,billing)
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: order
            })
        } catch (error) {
            handleError(res,error)
            console.log("error in razorpay order create ",error)
        }
    }
}