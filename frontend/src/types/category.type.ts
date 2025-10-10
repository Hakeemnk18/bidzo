export interface ICategoryDTO {
    _id: string;
    categoryName: string;
    description: string;
    isDeleted: boolean;
}

export interface IResCategory{
    success: boolean;
    message: string;
    data: ICategoryDTO[];
    total: number,
    currentPage: number,
    totalPages: number
}

export interface IResCategoryNameDTO {
    success: boolean;
    message: string;
    data: {_id:string, categoryName:string}[];
}