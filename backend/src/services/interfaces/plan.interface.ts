import { ICreatePlanDto, IGetAllPlanDTO } from "../../dtos/plan.dto";
import { Plan } from "../../types/plan.type";



export interface IPlanService {
    create(data: ICreatePlanDto): Promise<void>
    getAllPlan(data: IGetAllPlanDTO): Promise<{ resData: Plan[], total: number}>
    blockAndUnblockPlan(id: string): Promise<void>
    getPlan(id:string): Promise<Plan>
    editPlan(id: string, data: ICreatePlanDto): Promise<void>
    getAllPlanName(): Promise<Plan[]>
    findPlans(role: string): Promise<Plan[]>
}