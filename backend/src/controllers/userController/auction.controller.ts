import { Request, Response } from "express"
import { IAuctionUserController } from "./interfaces/auction.controller.interface";
import { inject, injectable } from "tsyringe";
import { ResponseMessages } from "../../constants/responseMessages";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { parseReq } from "../../utils/parseReq";
import { IAuctionService } from "../../services/interfaces/auction.intercafe";
import { handleError } from "../../utils/customError";

@injectable()
export class AuctionController implements IAuctionUserController {
    constructor(
        @inject("IAuctionService") private readonly auctionService: IAuctionService
    ){}

    async getAllAuctions(req: Request, res: Response): Promise<void> {
         try {
        
              const parseData = parseReq(req, ["status", "type"]);
              const { resData, total } = await this.auctionService.getAllAuctions(
                parseData,
                "user"
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
}