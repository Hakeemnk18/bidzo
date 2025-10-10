export interface IReqGetAllDocDTO {
    search: string,
    page: number,
    limit: number,
    sortValue: string,
    filters: Record<string, any>
}

export interface IGetAllDocDBDTO {
    query: Record<string, any>;
    page: number;
    limit: number;
    sort: Record<string, any>;
}