// models/Plan.ts
import mongoose, { Document, Schema } from "mongoose";
import { IFeature } from "../dtos/plan.dto";




const featureSchema = new Schema<IFeature>(
  {
    id: { type: String, required: true },
    feature: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { _id: false } 
);

interface IPlan extends Document {
    planName: string;
    yearlyAmount: number;
    monthlyAmount: number;
    target: "user" | "seller";
    features: IFeature[]
    isDeleted: boolean;
}


const planSchema = new Schema<IPlan>(
    {
        planName: {
            type: String,
            required: true,
            set: (v: string) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
        },
        yearlyAmount: {
            type: Number,
            required: true,
            min: 1
        },
        monthlyAmount: {
            type: Number,
            required: true,
            min: 1
        },
        target: {
            type: String,
            enum: ["user", "seller"],
            required: true,
        },
        features: {
            type: [featureSchema], 
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
