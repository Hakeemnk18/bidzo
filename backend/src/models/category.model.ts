import { Schema, Document, model } from "mongoose";

export interface ICategory extends Document {
  categoryName: string;
  description: string;
  isDeleted: boolean
}

const categorySchema = new Schema<ICategory>(
  {
    categoryName: { type: String, required: true },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, default: false}
  },
  {
    timestamps: true, 
  }
);

const CategoryModel = model<ICategory>("Category", categorySchema);
export default CategoryModel;
