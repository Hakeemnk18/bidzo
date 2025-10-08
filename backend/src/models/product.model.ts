import mongoose, { Schema, Document, model } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    category: mongoose.Types.ObjectId;     
    productImage: string[];       
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    productImage: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<IProduct>("Product", productSchema);
export default ProductModel;
