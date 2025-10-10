export interface IFeature {
    id: string;
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

export interface IResGetPlan {
    id?: string;
    planName: string;
    yearlyAmount: number;
    monthlyAmount: number;
    target: "user" | "seller";
    features: IFeature[]
    isDeleted: boolean;
}