import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";
import { ICreatePlanDto, IFeature } from "../../dtos/plan.dto";
import { Plan } from "../../types/plan.type";
import { CustomError } from "../customError";
import { z } from "zod";


export const createPlanSchema = z.object({
    planName: z.string().min(1, "Plan name is required"),
    target: z.enum(["user", "seller"], "Choose a valid target"),
    yearlyAmount: z.coerce.number().min(1, "Yearly amount must be greater than 0"),
    monthlyAmount: z.coerce.number().min(1, "Monthly amount must be greater than 0"),
    features: z.array(
        z.object({
            id: z.string(),
            feature: z.string().min(1),
            type: z.enum(["flat", "percentage", 'count']),
            value: z.coerce.number().min(1, "value must be greater than 0"),
        })
    ),
});




class CreatePLanValidation {

    static validMonthlyAmount = (plans: Plan[], amount: number, target: string, planName: string) => {


        let isValid: boolean = true
        const tragetPlan: Plan[] = plans.filter((item) => item.target === target)
        if (tragetPlan.length === 0) {
            return
        }
        if (planName === 'Gold') {
            isValid = tragetPlan.some((item) => {
                return item.planName === "Silver" && Number(item.monthlyAmount) < amount
            })

        } else if (planName === 'Silver') {
            isValid = tragetPlan.some((item) => {
                return item.planName === "Gold" && Number(item.monthlyAmount) > amount
            })

        }


        if (!isValid) {
            throw new CustomError(ResponseMessages.PLAN_INVALID_MONTHLY_AMOUNT, HttpStatusCode.BAD_REQUEST)
        }
    }

    static isExis(plans: Plan[], target: string, planName: string) {
        let isValid = plans.some((item) => {
            return item.target === target && item.planName === planName
        })
        if (isValid) {
            throw new CustomError(ResponseMessages.PLAN_EXIST, HttpStatusCode.BAD_REQUEST)
        }
    }

    static validYearlyAmount = (plans: Plan[], amount: number, target: string, planName: string) => {

        let isValid: boolean = true
        const tragetPlan: Plan[] = plans.filter((item) => item.target === target)
        if (tragetPlan.length === 0) {
            return 
        }
        if (planName === 'Gold') {
            isValid = tragetPlan.some((item) => {
                return item.planName === "Silver" && Number(item.yearlyAmount) < amount
            })

        } else if (planName === 'Silver') {
            
            isValid = tragetPlan.some((item) => {
                return item.planName === "Gold" && Number(item.yearlyAmount) > amount
            })
            console.log("is valid ", isValid)

        }

        if (!isValid) {
            throw new CustomError(ResponseMessages.PLAN_INVALID_YEARLY_AMOUNT, HttpStatusCode.BAD_REQUEST)
        }
    }

    static validateFeature = (plans: Plan[], featureRow: IFeature[], target: string, planName: string)=> {
        let res: boolean[] = []
        let allValid: boolean = true
        const targetPlan = plans.filter((item) => item.target === target);

        if (planName === 'Silver') {
            const comparedFeatures = targetPlan.filter((item) => item.planName === 'Gold').flatMap((item) => item.features)
            if (comparedFeatures.length && featureRow.length > comparedFeatures.length) {
                console.log("insid if")
                throw new CustomError(ResponseMessages.PLAN_INVALID_FEATURES,HttpStatusCode.BAD_REQUEST)
            }
        }

        if (planName === 'Gold') {
            const comparedFeatures = targetPlan.filter((item) => item.planName === 'Silver').flatMap((item) => item.features)
            if (comparedFeatures.length && featureRow.length < comparedFeatures.length) {
                throw new CustomError(ResponseMessages.PLAN_INVALID_FEATURES,HttpStatusCode.BAD_REQUEST)
            }
        }

        let comparePlanName = planName === "Gold" ? "Silver" : "Gold";
        const compareFeatures = targetPlan.filter((item) => item.planName === comparePlanName)
            .flatMap((item) => item.features)
        const featureSet = new Set(compareFeatures.map(f => f.feature));
        for (let i of featureRow) {
            let isValid = true
            if (featureSet.has(i.feature)) {
                const curFeater = compareFeatures.find(item => item.feature === i.feature)!;
                if (planName === 'Silver' && curFeater.type === i.type) {

                    isValid = curFeater.value >= i.value

                } else if (planName === 'Gold' && curFeater.type === i.type) {
                    isValid = curFeater.value < i.value
                }
            }
            res.push(isValid)
        }
        
        allValid = res.every(Boolean)
        if(!allValid){
            throw new CustomError(ResponseMessages.PLAN_INVALID_FEATURES,HttpStatusCode.BAD_REQUEST)
        }
    }
}

export const createPlanValidation = (data: ICreatePlanDto, plans: Plan[]) => {
    const { target, monthlyAmount, yearlyAmount, planName, features } = data
    CreatePLanValidation.isExis(plans, target, planName)
    CreatePLanValidation.validYearlyAmount(plans, yearlyAmount, target, planName)
    CreatePLanValidation.validMonthlyAmount(plans, monthlyAmount, target, planName)
    CreatePLanValidation.validateFeature(plans,features,target,planName)
}





