import { UpdateResult } from "mongoose";
import { ICreatePlanDto, } from "../../dtos/plan.dto";
import { IGetAllDocDBDTO } from "../../dtos/shared.dto";
import { Plan } from "../../types/plan.type";


export interface IPlanRepo {
    createPlan(data: ICreatePlanDto): Promise<void>
    findAllPlans(data: IGetAllDocDBDTO): Promise<Plan[]>
    countDocument(query: Record<string, any>): Promise<number>
    updatePlan(id: string, query: Record<string,any>): Promise<UpdateResult>
    findOne(query: Record<string, any>): Promise<Plan | null>
    findAllPlanName(query: Record<string, any>): Promise<Plan[]>
}