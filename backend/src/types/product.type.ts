import { Types } from "mongoose";

export type Product = {
  id?: string;
  name: string;
  description: string;
  category: Types.ObjectId;
  sellerId: Types.ObjectId;
  productImage: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
