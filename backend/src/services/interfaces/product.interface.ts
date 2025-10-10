import { IReqGetAllDocDTO } from "../../dtos/shared.dto";
import { IProductCreateDTO } from "../../dtos/product.dto";
import { Product } from "../../types/product.type";

export interface IProductService {
    getAllProducts(data: IReqGetAllDocDTO): Promise<{ resData: Product[]; total: number; }>;
    getAllProdectsBySellerId(data: IReqGetAllDocDTO, sellerId: string): Promise<{ resData: Product[]; total: number; }>;
    createProduct(data: IProductCreateDTO): Promise<void>;
    countDocuments(query: Record<string, any>): Promise<number>;
}