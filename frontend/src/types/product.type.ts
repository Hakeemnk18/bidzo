export interface ICategoryName{
    categoryName: string,
    _id: string
}

export interface IProductDTO {
    id: string;
    name: string;   
    description: string;
    category:string ;     
    productImage: string;      
    isDeleted: boolean;  
}

export interface IResProduct{
    success: boolean;
    message: string;
    data: IProductDTO[];
    total: number,
    currentPage: number,
    totalPages: number
}

export interface IProductFormData {
    name: string;   
    description: string;
    category: string;     
    productImage: string; 
    document: File | null
}   