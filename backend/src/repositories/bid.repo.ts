import { CreateBidReqDto } from "../dtos/bid.dto";
import { BidModel } from "../models/bid";
import { IBidRepository } from "./interfaces/bid.repo";

export class BidRepo implements IBidRepository {
    async create(data: CreateBidReqDto): Promise<void> {
        await BidModel.create(data)
    }
}