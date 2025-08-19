// models/Plan.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
    planName: string;
    yearlyAmount: number;
    monthlyAmount: number;
    target: "user" | "seller";
    features: string[]
    isDeleted: boolean;
}

const planSchema = new Schema<IPlan>(
    {
        planName: {
            type: String,
            required: true,
        },
        yearlyAmount: {
            type: Number,
            required: true,
        },
        monthlyAmount: {
            type: Number,
            required: true,
        },
        target: {
            type: String,
            enum: ["user", "seller"],
            required: true,
        },
        features: {
            type: [String], 
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const PlanModel = mongoose.model<IPlan>("Plan", planSchema);
export default PlanModel
