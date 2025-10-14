import { ICreateAuctionDTO } from "../../dtos/auction.dto";
import { Product } from "../../types/product.type";

export interface IAuctionService {
    create(data: ICreateAuctionDTO): Promise<void>
    getAllProducts(sellerId: string): Promise<Product[]>
}