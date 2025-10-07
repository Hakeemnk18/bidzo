type TargetType = "user" | "seller"

export interface IPlanFormData {
    planName: string,
    yearlyAmount: string,
    monthlyAmount: string,
    target: TargetType | "",

}

export interface IPlanFormProp {
    id: null | string
}
export type FeatureType = "count" | "flat" | "percentage";

export interface IPlanData {
    id: string
    planName: string,
    yearlyAmount: string,
    monthlyAmount: string,
    target: TargetType,
    isDeleted: boolean,
    features: FeatureRow[]
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


export interface FeatureRow {
    id: string,
    feature: string;
    type: string;
    value: string;
}

export interface FeatureConfigItem {
    value: string;
    label: string;
    allowedTypes: string[];
}

export type ITargetType = "user" | "seller";

export const featureConfigSet: Record<ITargetType, FeatureConfigItem[]> = {
    user: [
        { value: "autoBid", label: "Auto Bid", allowedTypes: ["count"] },
        { value: "bidDiscount", label: "Bid Discount", allowedTypes: ["flat", "percentage"] },
        
    ],
    seller: [
        { value: "autoliveAuction", label: "Auto Live Auction", allowedTypes: ["count"] },
        { value: "auctionDiscount", label: "Auction Discount", allowedTypes: ["flat", "percentage"] },
    ],
};

