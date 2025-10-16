import { injectable, inject } from "tsyringe";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { AuctionMapper } from "../../mappers/auction.mapper";
import { CustomError, handleError } from "../../utils/customError";
import { createAuctionSchema } from "../../utils/validations/auction";
import { IAuctioncontroller } from "./interfaces/auction.controller.interface";
import { IAuctionService } from "../../services/interfaces/auction.intercafe";
import { boolean } from "zod";
import { Response, Request } from "express";
import { ProductMapper } from "../../mappers/product.mappers";
import { parseReq } from "../../utils/parseReq";

@injectable()
export class AuctionController implements IAuctioncontroller {
  constructor(
    @inject("IAuctionService") private readonly auctionService: IAuctionService
  ) {}
  async createAuction(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { user } = req;
      if (!user) {
        throw new CustomError(
          ResponseMessages.UNAUTHORIZED,
          HttpStatusCode.UNAUTHORIZED
        );
      }

      const validateData = createAuctionSchema.parse(req.body);
      const auctionData = AuctionMapper.toCreateAuctionDTO(
        validateData,
        user.id
      );
      await this.auctionService.create(auctionData);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      handleError(res, error);
      console.log("error in create auction ", error);
    }
  }

  async allProduct(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { user } = req;
      if (!user) {
        throw new CustomError(
          ResponseMessages.UNAUTHORIZED,
          HttpStatusCode.UNAUTHORIZED
        );
      }
      const products = await this.auctionService.getAllProducts(user.id);

      const resData = ProductMapper.toResAllProductNames(products);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
        data: resData,
      });
    } catch (error) {
      handleError(res, error);
      console.log("error in create auction ", error);
    }
  }

  async allAuctions(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        
      const { user } = req;
      if (!user) {
        throw new CustomError(
          ResponseMessages.UNAUTHORIZED,
          HttpStatusCode.UNAUTHORIZED
        );
      }
      
      const parseData = parseReq(req, ["status","type"]);
      
      const { resData, total } = await this.auctionService.getAllAuctions(
        parseData,
        
      );
      
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
        data: resData,
        total: total,
        currentPage: parseData.page,
        totalPages: Math.ceil(total / parseData.limit),
      });
    } catch (error) {
      handleError(res, error);
      console.log("error in all auctions ", error);
    }
  }
}
