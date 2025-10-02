import type { IPlanData, FeatureRow } from "../types/plan,types"

export const validMonthlyAmount = (plans: IPlanData[], amount: number, target: string, planName: string): boolean => {

    let isValid: boolean = true
    const tragetPlan: IPlanData[] = plans.filter((item) => item.target === target)
    if (tragetPlan.length === 0) {
        return isValid
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

    return isValid
}


export const validYearlyAmount = (plans: IPlanData[], amount: number, target: string, planName: string): boolean => {

    let isValid: boolean = true
    const tragetPlan: IPlanData[] = plans.filter((item) => item.target === target)
    if (tragetPlan.length === 0) {
        return isValid
    }
    if (planName === 'Gold') {
        isValid = tragetPlan.some((item) => {
            return item.planName === "Silver" && Number(item.yearlyAmount) < amount
        })

    } else if (planName === 'Silver') {
        isValid = tragetPlan.some((item) => {
            return item.planName === "Gold" && Number(item.yearlyAmount) > amount
        })

    }

    return isValid
}


export const validateFeature = (plans: IPlanData[], featureRow: FeatureRow[], target: string, planName: string): boolean => {
    let res: boolean[] = []
    console.log("inside validate feature ")

    const targetPlan = plans.filter((item) => item.target === target);

    if (planName === 'Silver') {
        const comparedFeatures = targetPlan.filter((item) => item.planName === 'Gold').flatMap((item) => item.features)
        if (comparedFeatures.length && featureRow.length > comparedFeatures.length) {
            return false
        }

    }

    if (planName === 'Gold') {
        const comparedFeatures = targetPlan.filter((item) => item.planName === 'Silver').flatMap((item) => item.features)
        if (comparedFeatures.length && featureRow.length < comparedFeatures.length) {
            return false
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
    return res.every(Boolean)
}