import { IBid } from "../interfaces/auction";
import { Auction } from "../types/auction";
import { IResProductNameDTO } from "./product.dto";

export interface ICreateAuctionDTO {
  userId: string;
  product: string;
  basePrice: number;
  reservePrice: number;
  auctionType: "NORMAL" | "LIVE";
  startAt: Date;
  endAt: Date;
}

export interface IResAuctionDTO {
  id: string
  product: string; 
  auctionType: "NORMAL" | "LIVE";
  startAt: Date;
  endAt: Date;
  basePrice: number;
  reservePrice: number; 
  currentBid: number;
  bids: IBid[];
  winner?: string;
  status: "scheduled" | "running" | "ended" | "cancelled";
  isSold: boolean;
  type: "auto" | "manual";
}

export type PopulatedAuction = Omit<Auction, "product"> & {
    product: IResProductNameDTO
}

export type populatedResAuctions = Omit<IResAuctionDTO, "product"> & {
    product: IResProductNameDTO
}
