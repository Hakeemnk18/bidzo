import { ICreatePlanDto } from "../../dtos/plan.dto";


export interface IPlanRepo {
    createPlan(data: ICreatePlanDto): Promise<void>
}