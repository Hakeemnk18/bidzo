import { Schema, Document, model } from "mongoose";


interface IBid {
  bidder: Schema.Types.ObjectId;
  amount: number;
  timestamp: Date;
}


export interface IAuction extends Document {
  product: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId; 
  auctionType: "NORMAL" | "LIVE";
  startAt: Date;
  endAt: Date;
  basePrice: number;
  reservePrice: number; 
  currentBid: number;
  bids: IBid[];
  winner?: Schema.Types.ObjectId;
  status: "scheduled" | "running" | "ended" | "cancelled";
  isSold: boolean;
  isDeleted: boolean;
  type: "manual";
}


const bidSchema = new Schema<IBid>(
  {
    bidder: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false } 
);


const auctionSchema = new Schema<IAuction>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    auctionType: {
      type: String,
      enum: ["NORMAL", "LIVE"],
      default: "NORMAL",
    },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    basePrice: { type: Number, required: true },
    reservePrice: { type: Number, required: true  },
    currentBid: { type: Number, default: 0 },
    bids: [bidSchema], 
    winner: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["scheduled", "running", "ended", "cancelled"],
      default: "scheduled",
    },
    isDeleted: {type: Boolean, default: false },
    isSold: { type: Boolean, default: false },
    type: {
      type: String,
      default: "manual",
    },
  },
  {
    timestamps: true, 
  }
);


auctionSchema.index({ status: 1 });
auctionSchema.index({ endAt: 1 });

const AuctionModel = model<IAuction>("Auction", auctionSchema);

export default AuctionModel;