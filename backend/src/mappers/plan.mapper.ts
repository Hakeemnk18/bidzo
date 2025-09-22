import { ICreatePlanDto } from "../dtos/plan.dto";


export class PlanMapper {

    static toCreatePlanDTO (plan:any): ICreatePlanDto{
        return {
            planName: plan.planName,
            yearlyAmount: plan.yearlyAmount,
            monthlyAmount: plan.monthlyAmount,
            target: plan.target,
            features: plan.features
        }
    }
}