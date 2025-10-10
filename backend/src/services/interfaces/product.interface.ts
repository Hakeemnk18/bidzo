import { IReqGetAllDocDTO } from "../../dtos/shared.dto";
import { IProductCreateDTO, PopulatedProduct } from "../../dtos/product.dto";
import { Product } from "../../types/product.type";

export interface IProductService {
    getAllProducts(data: IReqGetAllDocDTO): Promise<{ resData: PopulatedProduct[]; total: number; }>;
    getAllProdectsBySellerId(data: IReqGetAllDocDTO, sellerId: string): Promise<{ resData: PopulatedProduct[]; total: number; }>;
    createProduct(data: IProductCreateDTO): Promise<void>;
    countDocuments(query: Record<string, any>): Promise<number>;
}