import { ICreatePlanDto } from "../../dtos/plan.dto";
import { IReqGetAllDocDTO } from "../../dtos/shared.dto";
import { Plan } from "../../types/plan.type";



export interface IPlanService {
    create(data: ICreatePlanDto): Promise<void>
    getAllPlan(data: IReqGetAllDocDTO): Promise<{ resData: Plan[], total: number}>
    blockAndUnblockPlan(id: string): Promise<void>
    getCurrentSubscriptionPlan(id:string): Promise<Plan | null>
    editPlan(id: string, data: ICreatePlanDto): Promise<void>
    getAllPlanName(): Promise<Plan[]>
    findPlans(role: string): Promise<Plan[]>
    findOne(query: Record<string, any>): Promise<Plan | null>
    getPlan(id: string): Promise<Plan>
}