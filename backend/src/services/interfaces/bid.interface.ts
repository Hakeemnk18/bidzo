import { CreateBidReqDto } from "../../dtos/bid.dto";
import { IRazorpayOrder } from "../../interfaces/razorpay";

export interface IBidService {
    createBid(data: CreateBidReqDto): Promise<void>
    //createRazorpayOrder(data: CreateBidReqDto): Promise<IRazorpayOrder>
}