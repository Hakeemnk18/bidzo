import { Request, Response } from "express";
import { IAuctionService } from "../../services/interfaces/auction.intercafe";
import { IAuctionAdminController } from "./interfaces/auction.controller";
import { inject, injectable } from "tsyringe";
import { parseReq } from "../../utils/parseReq";
import { handleError } from "../../utils/customError";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";
import { success } from "zod";



@injectable()
export class AdminAuctionController implements IAuctionAdminController {
  constructor(
    @inject("IAuctionService") private readonly auctionService: IAuctionService
  ) {}

  async getAllAuction(req: Request, res: Response): Promise<void> {
    try {

      const parseData = parseReq(req, ["status", "type"]);
      const { resData, total } = await this.auctionService.getAllAuctions(
        parseData,
        "admin"
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
        handleError(res, error)
        console.log("error in get all auction admin ",error)
    }
  }

  async deleteAuction(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params
        await this.auctionService.deleteAuction(id)
        res.status(HttpStatusCode.OK).json({
            success: true,
            message: ResponseMessages.SUCCESS
        })
      } catch (error) {
        handleError(res, error)
        console.log("error in delete auction admin ",error)
      }
  }

  async unBlockAuction(req: Request, res: Response): Promise<void> {
      try {
        
        const { id } = req.params
        await this.auctionService.removeDeleteAuction(id)
        res.status(HttpStatusCode.OK).json({
            success: true,
            message: ResponseMessages.SUCCESS
        })
      } catch (error) {
        handleError(res, error)
        console.log("error in unblock auction admin ",error)
      }
  }
}
