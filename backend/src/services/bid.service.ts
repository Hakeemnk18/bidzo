import { HttpStatusCode } from "../constants/httpStatusCode";
import { ResponseMessages } from "../constants/responseMessages";
import { CreateBidReqDto } from "../dtos/bid.dto";
import { IRazorpayOrder } from "../interfaces/razorpay";
import { IBidRepository } from "../repositories/interfaces/bid.repo";
import { CustomError } from "../utils/customError";
import { IAuctionService } from "./interfaces/auction.intercafe";
import { IBidService } from "./interfaces/bid.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class BidService implements IBidService {
  constructor(
    @inject("IBidRepository") private readonly _bidRepo: IBidRepository,
    @inject("IAuctionService") private readonly _auctionService: IAuctionService
  ) {}
  async createBid(data: CreateBidReqDto): Promise<void> {
    const auction = await this._auctionService.findOneAuction({
      _id: data.auctionId,
      status: "running",
      basePrice: { $lt: data.bidAmount },
      endAt: { $gt: new Date() },
      isDeleted: false,
      startAt: { $lt: new Date() },
      currentBid: { $lt: data.bidAmount },
    });
    if (!auction) {
      throw new CustomError(
        ResponseMessages.AUCTION_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }
    await this._bidRepo.create(data);
    await this._auctionService.incrementBidCount(auction.id!);
    await this._auctionService.setCurrentBidAndHigherBidder(
      auction.id!,
      data.bidAmount,
      data.userId
    );
  }

//   async createRazorpayOrder(data: CreateBidReqDto): Promise<IRazorpayOrder> {
//     const auction = await this._auctionService.findOneAuction({
//       _id: data.auctionId,
//       status: "running",
//       basePrice: { $lt: data.bidAmount },
//       endAt: { $gt: new Date() },
//       isDeleted: false,
//       startAt: { $lt: new Date() },
//       currentBid: { $lt: data.bidAmount },
//     });
//     if (!auction) {
//       throw new CustomError(
//         ResponseMessages.AUCTION_NOT_FOUND,
//         HttpStatusCode.NOT_FOUND
//       );
//     }

//     // const amount = Math.round(amountRupees * 100);
//     // const order = await razorpayOrderCreat({
//     //   amount,
//     //   currency: "INR",
//     //   receipt: `rcpt_${Date.now()}`,
//     //   notes: { planId: planId.toString(), billing },
//     // });

//     // await this.paymentService.create({
//     //   status: "PENDING",
//     //   amount,
//     //   orderId: order.id,
//     //   purpose: "SUBSCRIPTION",
//     //   method: "ONLINE",
//     //   userId,
//     // });

//     // return order;
//   }
}
