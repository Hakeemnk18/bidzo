import { CreatePlanDto } from "../../dtos/plan.dto";


export interface IPlanRepo {
    createPlan(data: CreatePlanDto): Promise<void>
}