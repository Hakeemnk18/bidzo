import { UpdateResult } from "mongoose";
import { ICreatePlanDto, IFetchAllDoc } from "../../dtos/plan.dto";
import { Plan } from "../../types/plan.type";


export interface IPlanRepo {
    createPlan(data: ICreatePlanDto): Promise<void>
    findAllPlans(data: IFetchAllDoc): Promise<Plan[]>
    countDocument(query: Record<string, any>): Promise<number>
    updatePlan(id: string, query: Record<string,any>): Promise<UpdateResult>
    findById(id: string): Promise<Plan | null>
    findAllPlanName(query: Record<string, any>): Promise<Plan[]>
}