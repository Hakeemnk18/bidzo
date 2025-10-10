import { UpdateResult } from "mongoose";
import { ICreatePlanDto} from "../dtos/plan.dto";
import PlanModel from "../models/plan.model";
import { Plan } from "../types/plan.type";
import { IPlanRepo } from "./interfaces/plan.repo.interface";
import { injectable } from "tsyringe";
import { IGetAllDocDBDTO } from "../dtos/shared.dto";


@injectable()
export class PlanRepository implements IPlanRepo {
    async createPlan(data: ICreatePlanDto): Promise<void> {
        await PlanModel.create(data)
    }

    async findAllPlans(data: IGetAllDocDBDTO ): Promise<Plan[]> {
        const { query, page, limit, sort} = data
        const skip = (page - 1)* limit
        return await PlanModel.find(query).skip(skip).limit(limit).sort(sort).collation({ locale: 'en', strength: 1 })
    }

    async countDocument(query: Record<string, any>): Promise<number> {
        return await PlanModel.countDocuments(query)
    }

    async updatePlan(id: string,query: Record<string, any>): Promise<UpdateResult>{
        return await PlanModel.updateOne({_id: id},query)
    }

    async findOne(query: Record<string, any>): Promise<Plan | null> {
        return await PlanModel.findOne(query)
    }

    async findAllPlanName(query: Record<string, any>): Promise<Plan[]> {
        return await PlanModel.find(query).sort({yearlyAmount: 1})
    }
    
}