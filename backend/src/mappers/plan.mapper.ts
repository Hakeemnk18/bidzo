import { ICreatePlanDto, IResGetPlan } from "../dtos/plan.dto";
import { Plan } from "../types/plan.type";


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

    static toPlanResponseDTO (plan: Plan[]): IResGetPlan[] {
        const plans: IResGetPlan[] = []

        plan.forEach((item: Plan)=>{
            plans.push({ 
                id: item.id,
                planName: item.planName,
                monthlyAmount: item.monthlyAmount,
                yearlyAmount: item.yearlyAmount,
                target: item.target,
                features: item.features,
                isDeleted: item.isDeleted
             })
        })

        return plans
    }
}