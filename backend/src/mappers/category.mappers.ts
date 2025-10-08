import { ICategoryResponseDTO } from "../dtos/category.dto";
import { Category } from "../types/category.type";

export class CategoryMappers {
    static toResponseCategoryDTO(category: Category): ICategoryResponseDTO {
        return {
            _id: category.id!,
            categoryName: category.categoryName,
            description: category.description,
            isDeleted: category.isDeleted,
        };
    }   

    static toResponseAllCategoryDTO(categorys: Category[]): ICategoryResponseDTO[] {
        return categorys.map(this.toResponseCategoryDTO);
    }
}