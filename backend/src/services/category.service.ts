import { ICategoryService } from "./interfaces/category.interface";
import { ICreateCategoryDTO } from "../dtos/category.dto";
import { ICategoryRepo } from "../repositories/interfaces/category.repo.interface";
import { injectable, inject } from "tsyringe";
import { Category } from "../types/category.type";  
import { CustomError } from "../utils/customError";
import { ResponseMessages } from "../constants/responseMessages";
import { HttpStatusCode } from "../constants/httpStatusCode";




@injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @inject('ICategoryRepo') private categoryRepo: ICategoryRepo) {} 
    async getAllCategories(): Promise<Category[]> {
        return this.categoryRepo.getAll();
    }       
    async createCategory(data: ICreateCategoryDTO): Promise<Category> {
        return this.categoryRepo.create(data);
    }
    async blockAndUnblockCategory(id: string): Promise<void> {
        const category = await this.categoryRepo.getById(id);
        if (!category) {
            throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }       
        await this.categoryRepo.update(id, { isDeleted: !category.isDeleted });
    }
    async editCategory(id: string, data: ICreateCategoryDTO): Promise<Category | null> {
        return this.categoryRepo.update(id, data);
    }   
}
