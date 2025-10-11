import { IReqGetAllDocDTO } from "../dtos/shared.dto";
import { IProductCreateDTO } from "../dtos/product.dto";
import { Product } from "../types/product.type";
import { IProductService } from "./interfaces/product.interface";
import { IProductRepo } from "../repositories/interfaces/product.repo.interface";
import { IGetAllDocDBDTO } from "../dtos/shared.dto";
import { inject, injectable } from "tsyringe";
import { PopulatedProduct } from "../dtos/product.dto";
import { CustomError } from "../utils/customError";
import { ResponseMessages } from "../constants/responseMessages";
import { HttpStatusCode } from "../constants/httpStatusCode";

@injectable()
export class ProductService implements IProductService {
  constructor(@inject("IProductRepo") private productRepo: IProductRepo) {}

  async getAllProdects(
    data: IReqGetAllDocDTO,
    sellerId?: string
  ): Promise<{ resData: PopulatedProduct[]; total: number }> {
    const { page, search, limit, sortValue, filters } = data;
    let query: Record<string, any> = {}
    if(sellerId){
      query.sellerId = sellerId
    };
  
    
    let sort: Record<string, any> = {};
    if (search && search.trim() !== "") {
      query.name = { $regex: `^${search.trim()}`, $options: "i" };
    }

    if (sortValue && sortValue.trim() !== "") {
      if (sortValue === "A-Z") {
        sort = { name: 1 };
      } else if (sortValue === "Z-A") {
        sort = { name: -1 };
      }
    }
    if (Object.keys(filters).length !== 0 && filters) {
      for (let key in filters) {
        query[key] = filters[key];
      }
    }

    let allDoc: IGetAllDocDBDTO = {
      page,
      limit,
      query,
      sort,
    };
    const [resData, total] = await Promise.all([
      this.productRepo.getAllProducts(allDoc),
      this.productRepo.countDocuments(query),
    ]);

    return { resData, total };
  }
  async createProduct(data: IProductCreateDTO): Promise<void> {
    return await this.productRepo.createProduct(data);
  }
  async countDocuments(query: Record<string, any>): Promise<number> {
    return await this.productRepo.countDocuments(query);
  }

  async findOne(query: Record<string, any>): Promise<Product> {
    const product = await this.productRepo.findOne(query);
    if (!product) {
      throw new CustomError(
        ResponseMessages.NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }
    return product
  }
  async findOneWithPopulated(query: Record<string, any>): Promise<PopulatedProduct> {
    const product = await this.productRepo.findOneWithPopulated(query)
    if (!product) {
      throw new CustomError(
        ResponseMessages.NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }
    return product
  }
  async blockAndUnblock(id: string, sellerId: string): Promise<void> {
    const product = await this.findOne({ _id: id,sellerId  });
    if (!product) {
      throw new CustomError(
        ResponseMessages.NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    await this.productRepo.updateOne(id, { isDeleted: !product.isDeleted });
  }

  async updateProduct(id: string, data: IProductCreateDTO): Promise<void> {
    const product = await this.findOne({ _id: id, sellerId: data.sellerId });
    const query = {
      name: data.name,
      description: data.description,
      category: data.category,
      sellerId: data.sellerId,
      productImage: data.productImage,
    };

    await this.productRepo.updateOne(id,query)
  }
}
