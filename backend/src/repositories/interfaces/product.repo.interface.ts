import { IProductCreateDTO, PopulatedProduct } from "../../dtos/product.dto";
import { IGetAllDocDBDTO } from "../../dtos/shared.dto";
import { Product } from "../../types/product.type";

export interface IProductRepo {
    getAllProducts(data: IGetAllDocDBDTO): Promise<PopulatedProduct[]>;
    createProduct(data: IProductCreateDTO): Promise<void>;
    countDocuments(query: Record<string, any>): Promise<number>;
    updateOne(id: string, query: Record<string, any>): Promise<void>
    findOne(quey: Record<string, any>):Promise<Product | null>
    findOneWithPopulated(quer: Record<string,any>):Promise<PopulatedProduct | null >
    allProducts(query: Record<string, any>): Promise<Product[]>
    updateMany(filter: Record<string, any>, update: Record<string, any>): Promise<void>
}