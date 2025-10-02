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

export interface IFetchAllDoc {
    query: Record<string, any>;
    page: number;
    limit: number;
    sort: Record<string, any>;
}

export interface IGetAllPlanDTO {
    search: string,
    page: number,
    limit: number,
    sortValue: string,
    filters: Record<string, any>
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