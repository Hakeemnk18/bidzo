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

