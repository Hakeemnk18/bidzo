import mongoose, { Document, Schema, Model } from "mongoose";
import { IQouta } from "../interfaces/subscription";


export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  planId: mongoose.Types.ObjectId;
  startAt: Date;
  endAt: Date;
  qouta: IQouta[];
  paymentId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const qoutaSchema = new Schema<IQouta>(
  {
    id: { type: String, required: true },
    feature: { type: String, required: true },
    type: { type: String, required: true }, 
    value: { type: Number, required: true }, 
    used: { type: Number, default: 0 }, 
  },
  { _id: false }
);

const subscriptionSchema: Schema<ISubscription> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    qouta: { type: [qoutaSchema], required: true },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
  },
  { timestamps: true }
);


export const SubscriptionModel: Model<ISubscription> = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
