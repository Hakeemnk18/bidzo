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

export interface IPlanData {
    id: string
    planName: string,
    yearlyAmount: string,
    monthlyAmount: string,
    target: TargetType,
    isDeleted: boolean,
    features: IFeaturesOptions[]
}

export interface IResGetPlanData {
    success: boolean
    data: IPlanData[],
    total: number,
    currentPage: number,
    totalPages: number
}

export interface IResGetPlanName {
    success: boolean
    data: IPlanData[],
    message: string
}

export interface IResPlanData {
  success: boolean,
  message: string
  data: IPlanData
}