import { ICreateAuctionDTO, PopulatedAuction } from "../../dtos/auction.dto";
import { IReqGetAllDocDTO } from "../../dtos/shared.dto";
import { Product } from "../../types/product.type";

export interface IAuctionService {
    create(data: ICreateAuctionDTO): Promise<void>
    getAllProducts(sellerId: string): Promise<Product[]>
    getAllAuctions(data: IReqGetAllDocDTO, userId?: string):Promise<{resData: PopulatedAuction[], total: number}>
    processAuctionStarts(): Promise<void>
    processAuctionEnds(): Promise<void>
    
}