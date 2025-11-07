import { Schema, Document, model } from 'mongoose';

export interface IBidCount extends Document {
  bidCount: number;                  
  amount: number;               
  updatedAt: Date;
}

const BidCountSchema = new Schema({
  bidCount: { type: Number, required: true, default: 0, unique: true },
  amount: { type: Number, required: true, default: 0, unique: true },
}, {
  timestamps: { createdAt: false, updatedAt: true }
});

export const BidCountModel = model<IBidCount>('BidCount', BidCountSchema);