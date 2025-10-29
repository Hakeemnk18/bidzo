import { injectable, inject } from "tsyringe";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { AuctionMapper } from "../../mappers/auction.mapper";
import { CustomError, handleError } from "../../utils/customError";
import { createAuctionSchema } from "../../utils/validations/auction";
import { IAuctionController } from "./interfaces/auction.controller.interface";
import { IAuctionService } from "../../services/interfaces/auction.intercafe";
import { boolean } from "zod";
import { Response, Request } from "express";
import { ProductMapper } from "../../mappers/product.mappers";
import { parseReq } from "../../utils/parseReq";
import { PopulatedAuction } from "../../dtos/auction.dto";

@injectable()
export class AuctionController implements IAuctionController {
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
      const products = await this.auctionService.getAllAvailableProducts(user.id);
      

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
      
      const { resData, total } = await this.auctionService.getAllAuctions(parseData,'seller',user.id);
      
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

  async cancelAuction(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { user } = req;
      const { id } = req.params
      if (!user) {
        throw new CustomError(
          ResponseMessages.UNAUTHORIZED,
          HttpStatusCode.UNAUTHORIZED
        );
      }
      await this.auctionService.cancelAuction(id,user.id)
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      handleError(res, error)
      console.log("error in cancel auction ",error)
    }
  }

  async unblockAuction(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { user } = req;
      const { id } = req.params
      if (!user) {
        throw new CustomError(
          ResponseMessages.UNAUTHORIZED,
          HttpStatusCode.UNAUTHORIZED
        );
      }
      await this.auctionService.unblockAuction(id,user.id)
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      handleError(res, error)
      console.log("error in unblock auction ",error)
    }
  }

  async getCurrentAuction(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { user } = req;
      const { id } = req.params
      if (!user) {
        throw new CustomError(
          ResponseMessages.UNAUTHORIZED,
          HttpStatusCode.UNAUTHORIZED
        );
      }
      const auction: PopulatedAuction = await this.auctionService.findOnePopulated(id, user.id)
      const resData = AuctionMapper.toResGetAuction(auction)
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
        data: resData
      });

    } catch (error) {
      handleError(res, error)
      console.log("error in get current auction ",error)
    }
  }

  async editAuction(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { user } = req;
      const { id } = req.params
      
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
      await this.auctionService.editAuction(id,auctionData);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      handleError(res, error);
      console.log("error in edit auction ", error);
    }
  }
}
