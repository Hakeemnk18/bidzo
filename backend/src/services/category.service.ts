import { ICategoryService } from "./interfaces/category.interface";
import type {
  ICreateCategoryDTO,
  IResCategoryNameDTO,
} from "../dtos/category.dto";
import { ICategoryRepo } from "../repositories/interfaces/category.repo.interface";
import { injectable, inject } from "tsyringe";
import { Category } from "../types/category.type";
import { CustomError } from "../utils/customError";
import { ResponseMessages } from "../constants/responseMessages";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { IGetAllDocDBDTO, IReqGetAllDocDTO } from "../dtos/shared.dto";

@injectable()
export class CategoryService implements ICategoryService {
  constructor(@inject("ICategoryRepo") private categoryRepo: ICategoryRepo) {}
  async getAllCategories(
    data: IReqGetAllDocDTO
  ): Promise<{ resData: Category[]; total: number }> {
    const { page, search, limit, sortValue, filters } = data;
    let query: Record<string, any> = {};
    let sort: Record<string, any> = {};
    if (search && search.trim() !== "") {
      query.categoryName = { $regex: `^${search.trim()}`, $options: "i" };
    }

    if (sortValue && sortValue.trim() !== "") {
      if (sortValue === "A-Z") {
        sort = { categoryName: 1 };
      } else if (sortValue === "Z-A") {
        sort = { categoryName: -1 };
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
      this.categoryRepo.getAll(allDoc),
      this.categoryRepo.countDocument(query),
    ]);

    return { resData, total };
  }
  async createCategory(data: ICreateCategoryDTO): Promise<Category> {
    const isValid = await this.categoryRepo.isExist(data.categoryName);
    if (isValid) {
      throw new CustomError(
        ResponseMessages.CATEGORY_EXIST,
        HttpStatusCode.CONFLICT
      );
    }
    return this.categoryRepo.create(data);
  }
  async blockAndUnblockCategory(id: string): Promise<void> {
    const category = await this.categoryRepo.getById(id);
    if (!category) {
      throw new CustomError(
        ResponseMessages.NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }
    await this.categoryRepo.update(id, { isDeleted: !category.isDeleted });
  }
  async editCategory(
    id: string,
    data: ICreateCategoryDTO
  ): Promise<Category | null> {
    
    const category = await this.categoryRepo.getById(id);
    if (!category) {
      throw new CustomError(
        ResponseMessages.NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }
    if (category.categoryName !== data.categoryName) {
      
      const isValid = await this.categoryRepo.isExist(data.categoryName);
      
      if (isValid) {
        throw new CustomError(
          ResponseMessages.CATEGORY_EXIST,
          HttpStatusCode.CONFLICT
        );
      }
    }
    return this.categoryRepo.update(id, data);
  }

  async getCategoriesName(): Promise<IResCategoryNameDTO[]> {
    return await this.categoryRepo.getNames()
  }
}
