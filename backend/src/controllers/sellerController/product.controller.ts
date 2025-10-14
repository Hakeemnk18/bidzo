import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { IProductService } from "../../services/interfaces/product.interface";
import { IProductController } from "./interfaces/product.controller";
import { CustomError, handleError } from "../../utils/customError";
import { ResponseMessages } from "../../constants/responseMessages";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { buildFilters } from "../../utils/buildFilters";
import { parseReq } from "../../utils/parseReq";
import { createProdectSchema } from "../../utils/validations/product";
import { inject, injectable } from "tsyringe";
import { ICategoryService } from "../../services/interfaces/category.interface";
import { success } from "zod";
import { ProductMapper } from "../../mappers/product.mappers";

@injectable()
export class ProductController implements IProductController {
    constructor(
        @inject('IProductService') private readonly productService: IProductService,
        @inject('ICategoryService') private readonly categoryService: ICategoryService
    ) {}
    async getAllProducts(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            
            const { user }  = req;
            if(!user) {
                throw new CustomError(ResponseMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED)
            }
            const parseData = parseReq(req, ['isDeleted']);
            const { resData, total} = await this.productService.getAllProducts(parseData, user.id);
            const products = ProductMapper.toResProductAllDTO(resData)
            
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: products,
                total: total,
                currentPage: parseData.page,
                totalPages: Math.ceil(total / parseData.limit),
            })
        } catch (error) {
            handleError(res, error);
            console.log("error in getAllProducts controller", error);
        }
    }

    async createProduct(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { user }  = req; 
            if(!user) {
                throw new CustomError(ResponseMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED)
            }
            
            const validatedData = createProdectSchema.parse(req.body);
            await this.productService.createProduct({
                ...validatedData,
                sellerId: user.id
            });
            res.status(HttpStatusCode.OK).json({
                message: ResponseMessages.PRODUCT_CREATED,
                success: true
            })
        } catch (error) {
            handleError(res, error);
            console.log("error in createProduct controller", error);
        }
    }

    async getCategoriesName(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.categoryService.getCategoriesName()
            res.status(HttpStatusCode.OK).json({
                success: true,
                data: categories
            })
        } catch (error) {
            handleError(res, error)
            console.log("error in get category name product controlller ",error)
        }
    }

    async blockAndUnblock(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { user } = req
            if(!user){
                throw new CustomError(ResponseMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED)
            }
            
            await this.productService.blockAndUnblock(id, user.id)
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS
            })
        } catch (error) {
            handleError(res, error)
            console.log("error in product unblock and block ",error)
        }
    }

    async updatePorduct(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { user } = req
            if(!user){
                throw new CustomError(ResponseMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED)
            }
            const { id } = req.params
            const validatedData = createProdectSchema.parse(req.body);
            await this.productService.updateProduct(id,{
                ...validatedData,
                sellerId: user.id
            });
            res.status(HttpStatusCode.OK).json({
                message: ResponseMessages.PRODUCT_CREATED,
                success: true
            })

        } catch (error) {
            handleError(res, error)
            console.log("error in edit product ",error)
        }
    }

    async  getProduct(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { user } = req
            if(!user){
                throw new CustomError(ResponseMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED)
            }
            const { id } = req.params
            const product = await this.productService.findOneWithPopulated({_id: id, sellerId: user.id})
            const resData = ProductMapper.toGetProductDTO(product)
            res.status(HttpStatusCode.OK).json({
                message: ResponseMessages.PRODUCT_CREATED,
                success: true,
                data: resData
            })

        } catch (error) {
            handleError(res, error)
            console.log("error in get one product product ",error)
        }
    }
}