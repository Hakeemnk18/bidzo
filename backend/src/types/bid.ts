import { Types } from "mongoose";
export type Bid = {
  userId: Types.ObjectId;
  auctionId: Types.ObjectId;
  bidAmount: number;
  createdAt: Date;
};
