import { inject, injectable } from "tsyringe";
import { IProductController } from "./interfaces/product.controller";
import { IProductService } from "../../services/interfaces/product.interface";
import { parseReq } from "../../utils/parseReq";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";
import { Request, Response } from "express";
import { ProductMapper } from "../../mappers/product.mappers";
import { CustomError, handleError } from "../../utils/customError";
import { IAuctionService } from "../../services/interfaces/auction.intercafe";

@injectable()
export class ProductController implements IProductController {
  constructor(
    @inject("IProductService") private readonly productService: IProductService,
    @inject("IAuctionService") private readonly auctionService: IAuctionService
  ) {}
  async getAllProduct(req: Request, res: Response): Promise<void> {
    try {
      const parseData = parseReq(req, ["isDeleted"]);
      const { resData, total } = await this.productService.getAllProducts(
        parseData
      );
      const products = ProductMapper.toResProductAllDTO(resData);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
        data: products,
        total: total,
        currentPage: parseData.page,
        totalPages: Math.ceil(total / parseData.limit),
      });
    } catch (error) {}
  }

  async blockAndUnblock(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const isUsed = await this.auctionService.isValidProduct(id);
      if (isUsed) {
        throw new CustomError(
          ResponseMessages.PRODUCT_IN_USE,
          HttpStatusCode.NOT_FOUND
        );
      }

      await this.productService.adminBlockAndUnblock(id);
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      handleError(res, error);
      console.log("error in admin product block and unblock ", error);
    }
  }
}
