import { Product } from "../types/product.type";
import { IResCategoryNameDTO } from "./category.dto";

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
export type IGetProductDTO =  Omit<IResProductDTO,'category'> & { category: IResCategoryNameDTO }

export type PopulatedProduct = Omit<Product,'category'> & { category: IResCategoryNameDTO }