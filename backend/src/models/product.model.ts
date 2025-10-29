import mongoose, { Schema, Document, model } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    category: mongoose.Types.ObjectId;  
    sellerId: mongoose.Types.ObjectId;   
    productImage: string;    
    isDeleted: boolean;
    isDeletedByAdmin: boolean,   
    isSold: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productImage: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isDeletedByAdmin: { type: Boolean, default: false },
    isSold:{ type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<IProduct>("Product", productSchema);
export default ProductModel;
