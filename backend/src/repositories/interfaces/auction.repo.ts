import { ICreateAuctionDTO, PopulatedAuction } from "../../dtos/auction.dto";
import { PopulatedProduct } from "../../dtos/product.dto";
import { IGetAllDocDBDTO } from "../../dtos/shared.dto";
import { Auction } from "../../types/auction";

export interface IAuctionRepo {
    create(data: ICreateAuctionDTO): Promise<void>
    getAll(pipline: any[]): Promise<PopulatedAuction[]>
    countDoucements(query: Record<string, any>): Promise<number>
    startDueAuctions(date: Date): Promise<number>
    endDueAuctions(date: Date): Promise<number>
    findOne(query: Record<string, any>): Promise<Auction | null>
    findOneAndUpdate(query : Record<string, any>): Promise<void>
    findByIdAndUpdate(id: string, query: Record<string,any>): Promise<void>
}