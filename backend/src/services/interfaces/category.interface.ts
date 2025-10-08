import { ICreateCategoryDTO } from "../../dtos/category.dto";
import { Category } from "../../types/category.type";

export interface ICategoryService {
  getAllCategories(): Promise<Category[]>;
  createCategory(data: ICreateCategoryDTO ): Promise<Category>;
  blockAndUnblockCategory(id: string): Promise<void>;
  editCategory(id: string, data: ICreateCategoryDTO): Promise<Category | null>;
}