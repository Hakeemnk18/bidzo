import { ICreateAuctionDTO } from "../dtos/auction.dto";

export class AuctionMapper {
    static toCreateAuctionDTO(data: any, id: string): ICreateAuctionDTO {
        return{
            userId: id,
            product: data.product,
            basePrice: parseInt(data.basePrice),
            reservePrice: parseInt(data.reservePrice),
            startAt: data.startAt,
            endAt: data.endAt,
            auctionType: data.auctionType
        }
    }
}