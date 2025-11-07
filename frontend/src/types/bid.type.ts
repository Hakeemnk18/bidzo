export interface IBidCount {
    bidCount: number,
    amount: number,
}

export interface IBidWithId extends IBidCount {
    _id: string
}

export interface IResCurrentBids  {
    success: boolean,
    message: string
    data: IBidCount[]
}

export interface IResBid{
    success: boolean;
    message: string;
    data: IBidWithId[];
    total: number,
    currentPage: number,
    totalPages: number
}