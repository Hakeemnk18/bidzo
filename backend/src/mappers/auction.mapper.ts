import {
  ICreateAuctionDTO,
  PopulatedAuction,
  PopulatedResAuctions,
} from "../dtos/auction.dto";

export class AuctionMapper {
  static toCreateAuctionDTO(data: any, id: string): ICreateAuctionDTO {
    return {
      userId: id,
      product: data.product,
      basePrice: parseInt(data.basePrice),
      reservePrice: parseInt(data.reservePrice),
      startAt: data.startAt,
      endAt: data.endAt,
      auctionType: data.auctionType,
    };
  }

  static toResGetAuction(data: PopulatedAuction): PopulatedResAuctions {
    return {
      id: data.id!,
      product: data.product,
      auctionType: data.auctionType,
      startAt: data.startAt,
      endAt: data.endAt,
      basePrice: data.basePrice,
      reservePrice: data.reservePrice,
      currentBid: data.currentBid,
      bids: data.bids,
      winner: data.winner,
      status: data.status,
      isSold: data.isSold,
      type: data.type,
    };
  }
}
