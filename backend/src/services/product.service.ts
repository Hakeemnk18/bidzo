import { IReqGetAllDocDTO } from "../dtos/shared.dto";
import { IProductCreateDTO } from "../dtos/product.dto";
import { Product } from "../types/product.type";
import { IProductService } from "./interfaces/product.interface";
import { IProductRepo } from "../repositories/interfaces/product.repo.interface";
import { IGetAllDocDBDTO } from "../dtos/shared.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProductService implements IProductService {
  constructor(@inject("IProductRepo") private productRepo: IProductRepo) {}
  async getAllProducts(
    data: IReqGetAllDocDTO
  ): Promise<{ resData: Product[]; total: number }> {
    const { page, search, limit, sortValue, filters } = data;
    let query: Record<string, any> = {};
    let sort: Record<string, any> = {};
    if (search && search.trim() !== "") {
      query.categoryName = { $regex: `^${search.trim()}`, $options: "i" };
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

  async getAllProdectsBySellerId(
    data: IReqGetAllDocDTO,
    sellerId: string
  ): Promise<{ resData: Product[]; total: number }> {
    const { page, search, limit, sortValue, filters } = data;
    let query: Record<string, any> = {
        sellerId: sellerId
    };
    let sort: Record<string, any> = {};
    if (search && search.trim() !== "") {
      query.categoryName = { $regex: `^${search.trim()}`, $options: "i" };
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
    return this.productRepo.createProduct(data);
  }
  async countDocuments(query: Record<string, any>): Promise<number> {
    return this.productRepo.countDocuments(query);
  }
}
