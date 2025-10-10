import { IProductCreateDTO, PopulatedProduct } from "../../dtos/product.dto";
import { IGetAllDocDBDTO } from "../../dtos/shared.dto";
import { Product } from "../../types/product.type";

export interface IProductRepo {
    getAllProducts(data: IGetAllDocDBDTO): Promise<PopulatedProduct[]>;
    createProduct(data: IProductCreateDTO): Promise<void>;
    countDocuments(query: Record<string, any>): Promise<number>;
}