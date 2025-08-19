
import { CreatePlanDto } from "../../dtos/plan.dto";



export interface IPlanService {
    creat(data: CreatePlanDto): Promise<void>
}