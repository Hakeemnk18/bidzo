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


@injectable()
export class PlanMangementController implements IPlanController {
    constructor(
        @inject('IPlanService') private readonly planService: IPlanService
    ) { }
    async createPlan(req: Request, res: Response): Promise<void> {
        try {
            console.log("inside plan create controller")

            const planData = PlanMapper.toCreatePlanDTO(req.body)

            await this.planService.creat(planData)

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
            const limit = 2;
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
            console.log("inside plan edit controller")

            const planData = PlanMapper.toCreatePlanDTO(req.body)
            const { planId } = req.body
            

            await this.planService.editPlan(planId,planData)

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.UPDATED

            })
        } catch (err) {
            console.log("error in plane create contoller ", err)
            handleError(res, err)
        }
    }
}