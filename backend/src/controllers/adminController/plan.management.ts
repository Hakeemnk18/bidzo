import { Request, Response } from "express";
import { IPlanController } from "./interfaces/plan.management.interface";
import { inject, injectable } from "tsyringe";
import { IPlanService } from "../../services/interfaces/plan.interface";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { success } from "zod";
import { handleError } from "../../utils/customError";
import { ICreatePlanDto } from "../../dtos/plan.dto";
import { PlanMapper } from "../../mappers/plan.mapper";
import { buildFilters } from "../../utils/buildFilters";


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
}