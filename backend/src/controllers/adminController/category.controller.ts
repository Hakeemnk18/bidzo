import { ICategoryController } from "./interfaces/category.controller.interface";
import { Request, Response } from "express";
import { ICategoryService } from "../../services/interfaces/category.interface";
import { createCategorySchema } from "../../utils/validations/category";
import { inject, injectable } from "tsyringe";
import { CategoryMappers } from "../../mappers/category.mappers";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { handleError } from "../../utils/customError";



@injectable()
export class CategoryControllers implements ICategoryController {
    constructor(
        @inject('ICategoryService') private categoryService: ICategoryService) {}

    async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.categoryService.getAllCategories();
            const resData = CategoryMappers.toResponseAllCategoryDTO(categories);
            res.status(HttpStatusCode.OK).json({
                success: true,
                data: resData
            });
        } catch (error) {
            handleError(res, error);
            console.log("error in getAllCategories", error);
        }
    }   

    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const parsedData = createCategorySchema.parse(req.body);
            await this.categoryService.createCategory(parsedData);  
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Category created successfully"
            });
        } catch (error) {
            handleError(res, error);
            console.log("error in createCategory", error);
        }
    }

    async blockAndUnblockCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.categoryService.blockAndUnblockCategory(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Category status updated successfully"
            });
        } catch (error) {
            handleError(res, error);
            console.log("error in blockAndUnblockCategory", error);
        }   
    }

    async editCategory(req: Request, res: Response): Promise<void> {    
        try {
            const { id } = req.params;
            const parsedData = createCategorySchema.parse(req.body);
            await this.categoryService.editCategory(id, parsedData);  
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Category updated successfully"
            });
        } catch (error) {
            handleError(res, error);
            console.log("error in editCategory", error);
        }      
    }

}