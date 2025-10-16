import { ICreateAuctionDTO, PopulatedAuction } from "../../dtos/auction.dto";
import { PopulatedProduct } from "../../dtos/product.dto";
import { IGetAllDocDBDTO } from "../../dtos/shared.dto";
import { Auction } from "../../types/auction";

export interface IAuctionRepo {
    create(data: ICreateAuctionDTO): Promise<void>
    getAll(pipline: any[]): Promise<PopulatedAuction[]>
    countDoucements(query: Record<string, any>): Promise<number>
}