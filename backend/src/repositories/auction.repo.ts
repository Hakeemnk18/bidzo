import { injectable } from "tsyringe";
import { ICreateAuctionDTO, PopulatedAuction } from "../dtos/auction.dto";
import AuctionModel from "../models/auction";
import { IAuctionRepo } from "./interfaces/auction.repo";
import { IResProductNameDTO, PopulatedProduct } from "../dtos/product.dto";
import { IGetAllDocDBDTO } from "../dtos/shared.dto";
import { Auction } from "../types/auction";
import ProductModel from "../models/product.model";
import { IResCategoryNameDTO } from "../dtos/category.dto";

@injectable()
export class AuctionRepo implements IAuctionRepo {
  constructor() {}

  async create(data: ICreateAuctionDTO): Promise<void> {
    await AuctionModel.create(data);
  }

  async getAll(pipline: any[]): Promise<PopulatedAuction[]> {
    const auctions = await AuctionModel.aggregate(pipline).exec()
    return auctions as unknown as PopulatedAuction[];
  }

  async countDoucements(query: Record<string, any>): Promise<number> {
    return await AuctionModel.countDocuments(query)
  }

  async startDueAuctions(date: Date): Promise<number> {
    const result = await AuctionModel.updateMany(
      { status: 'scheduled', startAt: { $lte: date } },
      { $set: { status: 'running' } }
    );
    return result.modifiedCount;
  }

  async endDueAuctions(date: Date): Promise<number> {
    const result = await AuctionModel.updateMany(
      { status: 'running', endAt: { $lte: date } },
      { $set: { status: 'ended' } }
    );
    return result.modifiedCount;
  }
}
