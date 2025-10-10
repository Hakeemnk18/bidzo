import { Product } from "../types/product.type";

export interface IProductCreateDTO {
    name: string;   
    description: string;
    category: string;     
    productImage: string; 
    sellerId: string;      
}

export interface IResProductDTO {
    id: string;
    name: string;   
    description: string;
    category: string;     
    productImage: string;      
    isDeleted: boolean;   
}
export interface IResProductExtendedDTO extends IResProductDTO {
    sellerId: string
}

export type populatedProduct = Omit<Product,'category' & { category: string }>