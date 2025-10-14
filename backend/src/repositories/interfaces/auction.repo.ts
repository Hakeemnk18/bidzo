import { ICreateAuctionDTO } from "../../dtos/auction.dto";

export interface IAuctionRepo {
    create(data: ICreateAuctionDTO): Promise<void>
}