type TargetType = "" | "user" | "seller"

export interface IPlanFormData {
    planName: string,
    yearlyAmount: string,
    monthlyAmount: string,
    target: TargetType,
    
}

export interface IPlanFormProp {
    id: null | string
}

export interface IFeaturesOptions {
    feature: string,
    type: string,
    value: string
}

export type FeatureType = "count" | "flat" | "percentage";

export interface IFeatureRow {
    feature: string;        
    type: FeatureType | ""; 
    value: number | "";     
}