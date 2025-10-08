import { ICreateCategoryDTO, IUpdateCategoryDTO } from "../../dtos/category.dto";
import { Category } from "../../types/category.type";


export interface ICategoryRepo {
    getAll(): Promise<Category[]>;
    getById(id: string): Promise<Category | null>;
    create(data: ICreateCategoryDTO): Promise<Category>;
    update(id: string, data: IUpdateCategoryDTO): Promise<Category | null>;
    delete(id: string): Promise<Category | null>;
}