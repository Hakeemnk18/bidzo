import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IBidCountController } from "./interfaces/bidCount.controller.interface";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { handleError } from "../../utils/customError";
import { IBidCountService } from "../../services/interfaces/bid.count.service.interface";
import { createBidCountSchema } from "../../utils/validations/bid.count";
import { parseReq } from "../../utils/parseReq";
import { ResponseMessages } from "../../constants/responseMessages";

@injectable()
export class BidCountController implements IBidCountController {
  constructor(
    @inject("IBidCountService") private bidCountService: IBidCountService
  ) {}

  async getAllBidCounts(req: Request, res: Response): Promise<void> {
    try {
      const bidCounts = await this.bidCountService.getAll();
      res.status(HttpStatusCode.OK).json({
        success: true,
        data: bidCounts,
      });
    } catch (error) {
      handleError(res, error);
      console.log("Error in getAllBidCounts:", error);
    }
  }

  async getBidCountById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const bidCount = await this.bidCountService.getById(id);

      if (!bidCount) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          success: false,
          message: "BidCount not found",
        });
        return;
      }

      res.status(HttpStatusCode.OK).json({
        success: true,
        data: bidCount,
      });
    } catch (error) {
      handleError(res, error);
      console.log("Error in getBidCountById:", error);
    }
  }

  async createBidCount(req: Request, res: Response): Promise<void> {
    try {
      const validateData = createBidCountSchema.parse(req.body);
      const newBidCount = await this.bidCountService.create(validateData);
      res.status(HttpStatusCode.CREATED).json({
        success: true,
        data: newBidCount,
      });
    } catch (error) {
      handleError(res, error);
      console.log("Error in createBidCount:", error);
    }
  }

  async updateBidCount(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedBidCount = await this.bidCountService.update(id, data);

      if (!updatedBidCount) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          success: false,
          message: "BidCount not found",
        });
        return;
      }

      res.status(HttpStatusCode.OK).json({
        success: true,
        data: updatedBidCount,
      });
    } catch (error) {
      handleError(res, error);
      console.log("Error in updateBidCount:", error);
    }
  }

  async deleteBidCount(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedBidCount = await this.bidCountService.delete(id);
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "BidCount deleted successfully",
        data: deletedBidCount,
      });
    } catch (error) {
      handleError(res, error);
      console.log("Error in deleteBidCount:", error);
    }
  }

  async getAllBidCountsByFilter(req: Request, res: Response): Promise<void> {
    try {
      const parseData = parseReq(req, ["isDeleted"]);
      const { resData, total } = await this.bidCountService.getByFilter(
        parseData
      );
      
      console.log(resData)

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
        data: resData,
        total: total,
        currentPage: parseData.page,
        totalPages: Math.ceil(total / parseData.limit),
      });
    } catch (error) {}
  }
}
