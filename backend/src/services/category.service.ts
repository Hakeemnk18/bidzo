import { ICategoryService } from "./interfaces/category.interface";
import type { ICategoryAllDoc, ICreateCategoryDTO, IGetAllCategoryDTO } from "../dtos/category.dto";
import { ICategoryRepo } from "../repositories/interfaces/category.repo.interface";
import { injectable, inject } from "tsyringe";
import { Category } from "../types/category.type";  
import { CustomError } from "../utils/customError";
import { ResponseMessages } from "../constants/responseMessages";
import { HttpStatusCode } from "../constants/httpStatusCode";


// export interface IGetAllCategoryDTO {
//     search: string,
//     page: number,
//     limit: number,
//     sortValue: string,
//     filters: Record<string, any>
// }

// export interface ICategoryAllDoc {
//     query: Record<string, any>;
//     page: number;
//     limit: number;
//     sort: Record<string, any>;
// }

@injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @inject('ICategoryRepo') private categoryRepo: ICategoryRepo) {} 
    async getAllCategories(data: IGetAllCategoryDTO): Promise<{resData: Category[], total: number}> {
        const { page, search, limit, sortValue, filters } = data
        let query: Record<string, any> = {}
        let sort: Record<string, any> = {}
        if(search && search.trim() !== ''){
            query.categoryName = { $regex: `^${search.trim()}`, $options: 'i' };
        }

        if(sortValue && sortValue.trim() !== ''){
            if(sortValue === 'A-Z'){
                sort = {categoryName: 1}
            }else if(sortValue === 'Z-A'){
                sort = { categoryName: -1}
            }
        }
        if(Object.keys(filters).length !== 0 && filters){
            for(let key in filters){
                query[key]= filters[key]
            }
        }
        

        let allDoc:ICategoryAllDoc = {
            page,
            limit,
            query,
            sort
        }
        const [resData, total] = await Promise.all([
            this.categoryRepo.getAll(allDoc),
            this.categoryRepo.countDocument(query)
        ])
        

        return { resData, total};
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
