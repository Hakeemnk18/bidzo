import { Request, Response } from "express";
import { IBidController } from "./interfaces/bid.controller.interface";
import { inject, injectable } from "tsyringe";
import { IBidService } from "../../services/interfaces/bid.interface";
import { CustomError, handleError } from "../../utils/customError";
import { createBidSchema } from "../../utils/validations/bid";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { ResponseMessages } from "../../constants/responseMessages";
import { HttpStatusCode } from "../../constants/httpStatusCode";

@injectable()
export class BidController implements IBidController {
  constructor(
    @inject("IBidService") private readonly _bidService: IBidService
  ) {}
  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        
      const { user } = req;
      if (!user) {
        throw new CustomError(
          ResponseMessages.USER_NOT_FOUND,
          HttpStatusCode.NOT_FOUND
        );
      }
    
      const validateData = createBidSchema.parse(req.body);
      await this._bidService.createBid({ ...validateData, userId: user.id });
       res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.LOGIN_SUCCESS,
      });

    } catch (error) {
      console.log("error in create bid ", error);
      handleError(res, error);
    }
  }
}
