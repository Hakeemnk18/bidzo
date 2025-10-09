import { ICategoryController } from "./interfaces/category.controller.interface";
import { Request, Response } from "express";
import { ICategoryService } from "../../services/interfaces/category.interface";
import { createCategorySchema } from "../../utils/validations/category";
import { inject, injectable } from "tsyringe";
import { CategoryMappers } from "../../mappers/category.mappers";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { handleError } from "../../utils/customError";
import { buildFilters } from "../../utils/buildFilters";



@injectable()
export class CategoryControllers implements ICategoryController {
    constructor(
        @inject('ICategoryService') private categoryService: ICategoryService) { }

    async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const filters = buildFilters(['isDeleted'], req.query)
            const page = parseInt(req.query.page as string) || 1;
            const search = req.query.search as string || ''
            let limit = parseInt(req.query.limit as string, 10);
            if (isNaN(limit) || limit <= 0) limit = 2;
            const sortValue = req.query.sort as string || ''
            const categories = await this.categoryService.getAllCategories({
                page, limit,
                search, sortValue,
                filters
            });
            const resData = CategoryMappers.toResponseAllCategoryDTO(categories.resData);
            res.status(HttpStatusCode.OK).json({
                success: true,
                data: resData,
                total: categories.total,
                currentPage: page,
                totalPages: Math.ceil(categories.total / limit),
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