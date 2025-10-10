import {  ICreateCategoryDTO, IResCategoryNameDTO } from "../../dtos/category.dto";
import { IReqGetAllDocDTO } from "../../dtos/shared.dto";
import { Category } from "../../types/category.type";

export interface ICategoryService {
  getAllCategories(data: IReqGetAllDocDTO): Promise<{resData: Category[], total: number}>;
  createCategory(data: ICreateCategoryDTO ): Promise<Category>;
  blockAndUnblockCategory(id: string): Promise<void>;
  editCategory(id: string, data: ICreateCategoryDTO): Promise<Category | null>;
  getCategoriesName():Promise<IResCategoryNameDTO[]>
}