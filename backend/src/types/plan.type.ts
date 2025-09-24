import { IFeature } from "../dtos/plan.dto";

export type Plan = {
    id?: string;
    planName: string;
    yearlyAmount: number;
    monthlyAmount: number;
    target: "user" | "seller";
    features: IFeature[]
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};