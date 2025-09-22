
import { ICreatePlanDto } from "../../dtos/plan.dto";



export interface IPlanService {
    creat(data: ICreatePlanDto): Promise<void>
}