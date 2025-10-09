export interface ICreateCategoryDTO {
    categoryName: string;
    description: string;
}


export interface IUpdateCategoryDTO {
    categoryName?: string; 
    description?: string;
    isDeleted?: boolean;
}

export interface ICategoryResponseDTO {
    _id: string;
    categoryName: string;
    description: string;
    isDeleted: boolean;
}

export interface IGetAllCategoryDTO {
    search: string,
    page: number,
    limit: number,
    sortValue: string,
    filters: Record<string, any>
}

export interface ICategoryAllDoc {
    query: Record<string, any>;
    page: number;
    limit: number;
    sort: Record<string, any>;
}