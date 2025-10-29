import { IProductCreateDTO, PopulatedProduct } from "../dtos/product.dto";
import { IGetAllDocDBDTO } from "../dtos/shared.dto";
import { Product } from "../types/product.type";
import { IProductRepo } from "./interfaces/product.repo.interface";
import ProductModel from "../models/product.model";
import { injectable } from "tsyringe";
import { IResCategoryNameDTO } from "../dtos/category.dto";
import { Query } from "mongoose";
import products from "razorpay/dist/types/products";


@injectable()
export class ProductRepo implements IProductRepo {
  async getAllProducts(data: IGetAllDocDBDTO): Promise<PopulatedProduct[]> {
    const fieldsToSelect = '_id categoryName';
    const { query, page, limit, sort } = data;
    const skip = (page - 1) * limit;
    const products = await ProductModel.find(query)
      .skip(skip) 
      .limit(limit) 
      .sort(sort) 
      .collation({ locale: "en", strength: 1 }) 
      .populate<{ category: IResCategoryNameDTO}>('category', fieldsToSelect)
      .exec();

    return products as PopulatedProduct[]
  }
  async createProduct(data: IProductCreateDTO): Promise<void> {
    await ProductModel.create(data);
  }
  
  async countDocuments(query: Record<string, any>): Promise<number> {
    return await ProductModel.countDocuments(query).exec();
  } 

  async updateOne(id: string, query: Record<string, any>): Promise<void> {
    await ProductModel.findOneAndUpdate({_id: id},{$set : query})
  }
  async findOne(quey: Record<string, any>): Promise<Product | null> {
    return ProductModel.findOne(quey)
  }

  async findOneWithPopulated(query: Record<string, any>): Promise<PopulatedProduct | null> {
    const fieldsToSelect = '_id categoryName';
    return await ProductModel.findOne(query).populate<{ category: IResCategoryNameDTO}>('category', fieldsToSelect)
  }

  async allProducts(query: Record<string, any>): Promise<Product[]> {
    return await ProductModel.find(query)
  }

  async updateMany(filter: Record<string, any>, update: Record<string, any>): Promise<void> {
    await ProductModel.updateMany(filter, update)
  }
}
