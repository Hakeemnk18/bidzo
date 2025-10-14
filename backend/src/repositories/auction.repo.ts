import { injectable } from "tsyringe";
import { ICreateAuctionDTO } from "../dtos/auction.dto";
import AuctionModel from "../models/auction";
import { IAuctionRepo } from "./interfaces/auction.repo";


@injectable()
export class AuctionRepo implements IAuctionRepo {
    constructor(){}

    async create(data: ICreateAuctionDTO): Promise<void> {
        await AuctionModel.create(data)
    }
}