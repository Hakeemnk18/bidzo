import { ICreatePlanDto, IGetAllPlanDTO } from "../../dtos/plan.dto";
import { Plan } from "../../types/plan.type";



export interface IPlanService {
    creat(data: ICreatePlanDto): Promise<void>
    getAllPlan(data: IGetAllPlanDTO): Promise<{ resData: Plan[], total: number}>
    blockAndUnblockPlan(id: string): Promise<void>
}