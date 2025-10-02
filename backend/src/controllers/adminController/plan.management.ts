import { Request, Response } from "express";
import { IPlanController } from "./interfaces/plan.management.interface";
import { inject, injectable } from "tsyringe";
import { IPlanService } from "../../services/interfaces/plan.interface";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { success } from "zod";
import { handleError } from "../../utils/customError";
import { ICreatePlanDto, IResGetPlan } from "../../dtos/plan.dto";
import { PlanMapper } from "../../mappers/plan.mapper";
import { buildFilters } from "../../utils/buildFilters";
import { ResponseMessages } from "../../constants/responseMessages";
import { createPlanSchema } from "../../utils/validations/planValidations";


@injectable()
export class PlanMangementController implements IPlanController {
    constructor(
        @inject('IPlanService') private readonly planService: IPlanService
    ) { }
    async createPlan(req: Request, res: Response): Promise<void> {
        try {
            console.log("inside plan create controller")
            const validatedData = createPlanSchema.parse(req.body);
            const planData = PlanMapper.toCreatePlanDTO(validatedData)
            // console.log(planData)
            await this.planService.create(planData)
            res.status(HttpStatusCode.OK).json({
                success: true
            })
        } catch (err) {
            console.log("error in plane create contoller ", err)
            handleError(res, err)
        }
    }

    async getPlans(req: Request, res: Response): Promise<void> {

        try {
            const filters = buildFilters(['isDeleted'], req.query)
            const page = parseInt(req.query.page as string) || 1;
            const search = req.query.search as string || ''
            let limit = parseInt(req.query.limit as string, 10);
            if (isNaN(limit) || limit <= 0) limit = 2;
            const sortValue = req.query.sort as string || ''

            const result = await this.planService.getAllPlan({
                page, limit,
                search, sortValue,
                filters
            })
            const data = PlanMapper.toPlanResponseDTO(result.resData)
            res.status(HttpStatusCode.OK).json({
                success: true,
                data,
                total: result.total,
                currentPage: page,
                totalPages: Math.ceil(result.total / limit),
            });
        } catch (err) {
            console.log("error in get plan contoller ", err)
            handleError(res, err)
        }

    }

    async blockAndUnblockPlan(req: Request, res: Response): Promise<void> {
        try {
            const { planId } = req.body
            await this.planService.blockAndUnblockPlan(planId)
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS
            })
        } catch (err) {
            console.log("error in  remove plan contoller ", err)
            handleError(res, err)
        }
    }

    async getPlan(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const plan = await this.planService.getPlan(id)
            const data: IResGetPlan = PlanMapper.toGetPlanResDTO(plan)
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data
            })
        } catch (err) {
            console.log("error in get one plan contoller ", err)
            handleError(res, err)
        }

    }

    async editPlan(req: Request, res: Response): Promise<void> {
        try {
            

            const planData = PlanMapper.toCreatePlanDTO(req.body)
            const { planId } = req.body


            await this.planService.editPlan(planId, planData)

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.UPDATED

            })
        } catch (err) {
            console.log("error in plane create contoller ", err)
            handleError(res, err)
        }
    }

    async planName(req: Request, res: Response): Promise<void> {
        try {
            
            const plans = await this.planService.getAllPlanName()
            const resPlan = PlanMapper.toPlanResponseDTO(plans)
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.UPDATED,
                data: resPlan
            })
        } catch (err) {
            console.log("error in get plan name ", err)
            handleError(res, err)
        }
    }
}