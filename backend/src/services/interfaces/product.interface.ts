import { IReqGetAllDocDTO } from "../../dtos/shared.dto";
import { IProductCreateDTO, PopulatedProduct } from "../../dtos/product.dto";
import { Product } from "../../types/product.type";

export interface IProductService {
    getAllProdects(data: IReqGetAllDocDTO, sellerId?: string): Promise<{ resData: PopulatedProduct[]; total: number; }>;
    createProduct(data: IProductCreateDTO): Promise<void>;
    countDocuments(query: Record<string, any>): Promise<number>;
    findOne(query: Record<string, any>): Promise<Product>
    blockAndUnblock(id: string, sellerId: string): Promise<void>
    updateProduct(id: string, data: IProductCreateDTO): Promise<void>
    findOneWithPopulated(query: Record<string, any>): Promise<PopulatedProduct>
    adminBlockAndUnblock(id: string): Promise<void>
}