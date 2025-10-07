export interface IResCurrentSubscription {
    data?: IResSubscription
    success: boolean;
    message: string;
}

export interface IResSubscription {
    _id?: string;
    userId: string;
    planId: string;
    startAt: Date;
    endAt: Date;
    qouta: IQouta[];
    isExpired: boolean;
    billing: 'monthly' | 'yearly';
}

export interface IQouta {
    id: string;
    feature: string;
    type: string;
    value: number;
    used: number;
}