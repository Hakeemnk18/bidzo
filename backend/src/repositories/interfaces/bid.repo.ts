import { CreateBidReqDto } from "../../dtos/bid.dto";

export interface IBidRepository {
    create(data: CreateBidReqDto): Promise<void>
}