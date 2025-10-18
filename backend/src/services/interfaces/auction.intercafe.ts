import { ICreateAuctionDTO, PopulatedAuction } from "../../dtos/auction.dto";
import { IReqGetAllDocDTO } from "../../dtos/shared.dto";
import { Auction } from "../../types/auction";
import { Product } from "../../types/product.type";

export interface IAuctionService {
    create(data: ICreateAuctionDTO): Promise<void>
    getAllProducts(sellerId: string): Promise<Product[]>
    getAllAuctions(data: IReqGetAllDocDTO, userId?: string):Promise<{resData: PopulatedAuction[], total: number}>
    processAuctionStarts(): Promise<void>
    processAuctionEnds(): Promise<void>
    isEligibleForModification(query: Record<string,any>): Promise<boolean>
    cancelAuction(id: string, userId:string): Promise<void>
    findOneAuction(query: Record<string,any>): Promise<Auction | null>
    unblockAuction(id: string, userId: string): Promise<void>
    findOnePopulated(id: string, userId: string): Promise<PopulatedAuction>
    editAuction(id: string,  data: ICreateAuctionDTO): Promise<void>
}