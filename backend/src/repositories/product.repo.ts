import { IProductCreateDTO, PopulatedProduct } from "../dtos/product.dto";
import { IGetAllDocDBDTO } from "../dtos/shared.dto";
import { Product } from "../types/product.type";
import { IProductRepo } from "./interfaces/product.repo.interface";
import ProductModel from "../models/product.model";
import { injectable } from "tsyringe";
import { IResCategoryNameDTO } from "../dtos/category.dto";


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
}
