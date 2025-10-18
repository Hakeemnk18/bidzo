import { IBid } from "../interfaces/auction";
import { Types } from "mongoose";

export type Auction = {
  id?:string,
  product: Types.ObjectId;
  userId: Types.ObjectId; 
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
  createdAt?: Date;
  updatedAt?: Date;
  
}

