import { HttpStatusCode } from "../constants/httpStatusCode";
import { ResponseMessages } from "../constants/responseMessages";
import { ICreatePlanDto, IGetAllPlanDTO } from "../dtos/plan.dto";
import { IPlanRepo } from "../repositories/interfaces/plan.repo.interface";
import { Plan } from "../types/plan.type";
import { CustomError } from "../utils/customError";
import { IPlanService } from "./interfaces/plan.interface";
import { injectable, inject } from "tsyringe";



@injectable()
export class PlanService implements IPlanService {

    constructor(
        @inject('IPlanRepo') private readonly planRepo: IPlanRepo
    ) { }

    async creat(data: ICreatePlanDto): Promise<void> {
        await this.planRepo.createPlan(data)
    }

    async getAllPlan(data: IGetAllPlanDTO): Promise<{ resData: Plan[]; total: number; }> {
        //console.log("inside get palan srvc ",data)
        const { page, limit, search, sortValue, filters } = data
        const query: Record<string, any> = {}
        let sort: Record<string, any> = {}

        if (search && search.trim() !== '') {
            query.planName = { $regex: `^${search.trim()}`, $options: 'i' };
        }

        if (sortValue && sortValue.trim() !== '') {
            if (sortValue === 'A-Z') {
                sort = { planName: 1 };
            } else if (sortValue === 'Z-A') {
                sort = { planName: -1 };
            } else if (sortValue === 'monthlyAsc') {
                sort = { monthlyAmount: 1 };
            } else if (sortValue === 'monthlyDesc') {
                sort = { monthlyAmount: -1 };
            } else if (sortValue === 'yearlyAsc') {
                sort = { yearlyAmount: 1 };
            } else if (sortValue === 'yearlyDesc') {
                sort = { yearlyAmount: -1 };
            } else {
                sort = {};
            }
        }
        if (Object.keys(filters).length !== 0) {
            for (let key in filters) {
                query[key] = filters[key]
            }
        }
        const [resData, total] = await Promise.all([
            this.planRepo.findAllPlans({ query, sort, limit, page }),
            this.planRepo.countDocument(query)
        ])
        return { resData, total }
    }

    async blockAndUnblockPlan(id: string): Promise<void> {
        const plan = await this.planRepo.findById(id)
        const updateResult = await this.planRepo.updatePlan(id, { isDeleted: !plan?.isDeleted})
        if(updateResult.matchedCount === 0){
            throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }
    }
}