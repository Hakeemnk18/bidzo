import { Schema, Document, model } from 'mongoose';

export interface IBid extends Document {
  userId: Schema.Types.ObjectId;    
  auctionId: Schema.Types.ObjectId; 
  bidAmount: number;
  createdAt: Date;
}


const BidSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  auctionId: { type: Schema.Types.ObjectId, ref: 'Auction', required: true },
  bidAmount: { type: Number, required: true },
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

export const BidModel = model<IBid>('Bid', BidSchema);