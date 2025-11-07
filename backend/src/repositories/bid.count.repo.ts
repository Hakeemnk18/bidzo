import { injectable } from "tsyringe";

import { IBidCountDto } from "../dtos/bid.count.dto";
import { BidCountModel } from "../models/bid.count.model";
import { IBidCountRepo } from "./interfaces/bid.count.repo";
import { IGetAllDocDBDTO } from "../dtos/shared.dto";
import { BidPack } from "../types/bid.pack";


@injectable()
export class BidCountRepo implements IBidCountRepo {
  async getAll(): Promise<IBidCountDto[]> {
    const bidCounts = await BidCountModel.find().sort({ bidCount: 1}).lean().exec();
    return bidCounts as IBidCountDto[];
  }

  async countDocument(query: Record<string, any>): Promise<number> {
    return await BidCountModel.countDocuments(query)
  }

  async getByFilter(data: IGetAllDocDBDTO): Promise<BidPack[]> {
    const { query, sort, limit, page } = data
    const skip = (page - 1) * limit;
    return await BidCountModel.find(query).skip(skip).limit(limit).sort(sort).exec()
  }

  async getById(id: string): Promise<IBidCountDto | null> {
    const bidCount = await BidCountModel.findById(id).lean().exec();
    return bidCount as IBidCountDto | null;
  }

  async create(data: IBidCountDto): Promise<IBidCountDto> {
    const newBidCount = await BidCountModel.create(data);
    return newBidCount.toObject() as IBidCountDto;
  }

  async update(id: string, data: IBidCountDto): Promise<IBidCountDto | null> {
    const updatedBidCount = await BidCountModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    )
      .lean()
      .exec();

    return updatedBidCount as IBidCountDto | null;
  }

  async delete(id: string): Promise<IBidCountDto | null> {
    const deletedBidCount = await BidCountModel.findByIdAndDelete(id)
      .lean()
      .exec();
    return deletedBidCount as IBidCountDto | null;
  }
}