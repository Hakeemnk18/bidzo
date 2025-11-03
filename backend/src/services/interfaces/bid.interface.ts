import { CreateBidReqDto } from "../../dtos/bid.dto";

export interface IBidService {
    createBid(data: CreateBidReqDto): Promise<void>
}