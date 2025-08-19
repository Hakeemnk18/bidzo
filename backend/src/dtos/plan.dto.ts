
export interface CreatePlanDto {
    planName: string;
    yearlyAmount: number;
    monthlyAmount: number;
    target: "user" | "seller";
    features: string[]
}