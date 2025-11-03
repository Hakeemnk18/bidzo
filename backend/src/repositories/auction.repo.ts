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

  async findAuctions(query: Record<string, any>): Promise<Auction[]> {
    return await AuctionModel.find(query)
  }

  async findAllLiveAuction(): Promise<Auction[]> {
    return await AuctionModel.find({status: {$in: ['scheduled', 'running']}})
  }

  async getAllLiveAuctionProducts(): Promise<string[]> {
    const auction = await AuctionModel.find({
      status: {$in: ['scheduled', 'running']}},
      'product'
    )
    return auction.map((auction)=> auction.product.toString())
  }
 

  async getAll(pipeline: any[]): Promise<PopulatedAuction[]> {
    const auctions = await AuctionModel.aggregate(pipeline).exec()
    return auctions as unknown as PopulatedAuction[];
  }

  async countDocuments(pipeline: any[]): Promise<number> {
    const num = await AuctionModel.aggregate(pipeline)
    const total: number = num[0]?.total | 0
    return total
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

  async findOne(query: Record<string, any>): Promise<Auction | null> {
    return await AuctionModel.findOne(query)
  }

  async findOneAndUpdate(
    filter: Record<string, any>, 
  update: Record<string, any>
): Promise<void> {
    await AuctionModel.findOneAndUpdate(filter, update)
  }

  async findByIdAndUpdate(id: string, query: Record<string, any>): Promise<void> {
    await AuctionModel.findByIdAndUpdate(id,{ $set: query})
  }

  async findOneWithPopulated(query: Record<string, any>): Promise<PopulatedAuction | null> {
    const fieldsToSelect = '_id name';
    const product = await AuctionModel.findOne(query)
    .populate('product', fieldsToSelect)
    return product as unknown as PopulatedAuction
  }

  async updateAndReturn(id: string, query: Record<string, any>): Promise<Auction | null> {
    return await AuctionModel.findByIdAndUpdate(id,{ $set: query}, { new : true})
  }

  async findAllEnded(query: Record<string, any>): Promise<Auction[]> {
    return await AuctionModel.find(query, { _id: 1, product: 1})
  }
}
