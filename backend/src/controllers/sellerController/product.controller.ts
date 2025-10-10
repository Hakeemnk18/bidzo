import { Response } from "express";
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

@injectable()
export class ProductController implements IProductController {
    constructor(
        @inject('IProductService') private productService: IProductService
    ) {}
    async getAllProducts(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { user }  = req;
            if(!user) {
                throw new CustomError(ResponseMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED)
            }
            const parseData = parseReq(req, ['isDeleted']);
            const result = await this.productService.getAllProdectsBySellerId(parseData, user.id);
            res.status(HttpStatusCode.OK).json({
                message: ResponseMessages.SUCCESS,
                data: result.resData,
                total: result.total
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
}