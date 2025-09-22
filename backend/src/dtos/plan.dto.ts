export interface IFeature {
    feature: string;
    type: string;
    value: number;
}


export interface ICreatePlanDto {
    planName: string;
    yearlyAmount: number;
    monthlyAmount: number;
    target: "user" | "seller";
    features: IFeature[]
}