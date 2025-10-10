import {  ICreateCategoryDTO, IUpdateCategoryDTO } from "../../dtos/category.dto";
import { Category } from "../../types/category.type";
import { IGetAllDocDBDTO } from "../../dtos/shared.dto";


export interface ICategoryRepo {
    getAll(data: IGetAllDocDBDTO): Promise<Category[]>;
    getById(id: string): Promise<Category | null>;
    create(data: ICreateCategoryDTO): Promise<Category>;
    update(id: string, data: IUpdateCategoryDTO): Promise<Category | null>;
    delete(id: string): Promise<Category | null>;
    isExist(categoryName: string): Promise<boolean>;
    countDocument(query: Record<string, any>): Promise<number>
}