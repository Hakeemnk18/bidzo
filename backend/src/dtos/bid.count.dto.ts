export interface IBidCountDto {
    bidCount: number,
    amount: number
}

export interface IBidCountWithId extends IBidCountDto {
    _id: string
}