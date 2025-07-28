import { Schema, model, Document } from "mongoose";

interface IOTP extends Document {
  email: string;
  otp: string;
  expiry: Date
}

const otpSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiry: {
    type: Date,
    required: true,
    index: { expires: 0 } 
  },
}, { timestamps: true });

const OTPModel = model<IOTP>("OTP", otpSchema);

export default OTPModel