import mongoose, { Document, Schema, Model } from "mongoose";


export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  status: "SUCCESS" | "FAILED" | "PENDING";
  method: string;
  amount: number;
  orderId: string;
  transactionId: string;
  purpose: "SUBSCRIPTION" | "BID" | "AUCTION";
}


const paymentSchema: Schema<IPayment> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["SUCCESS", "FAILED", "PENDING"],
    default: "PENDING",
  },
  method: { type: String, required: true },
  amount: { type: Number, required: true },
  orderId: { type: String, required: true },
  transactionId: { type: String },
  purpose: {
    type: String,
    enum: ["SUBSCRIPTION", "BID", "AUCTION"],
    required: true,
  },
}, { timestamps: true });


const PaymentModel: Model<IPayment> = mongoose.model<IPayment>("Payment", paymentSchema);

export default PaymentModel;
