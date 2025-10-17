import { ICreateAuctionDTO, PopulatedAuction } from "../dtos/auction.dto";
import { IAuctionRepo } from "../repositories/interfaces/auction.repo";
import { Product } from "../types/product.type";
import { IAuctionService } from "./interfaces/auction.intercafe";
import { inject, injectable } from "tsyringe";
import { IProductService } from "./interfaces/product.interface";
import { CustomError } from "../utils/customError";
import { ResponseMessages } from "../constants/responseMessages";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { IGetAllDocDBDTO, IReqGetAllDocDTO } from "../dtos/shared.dto";
import { Auction } from "../types/auction";

@injectable()
export class AuctionService implements IAuctionService {
  constructor(
    @inject("IAuctionRepo") private readonly auctionrepo: IAuctionRepo,
    @inject("IProductService") private readonly productService: IProductService
  ) {}

  async create(data: ICreateAuctionDTO): Promise<void> {
    const product = await this.productService.findOne({
      sellerId: data.userId,
      isDeleted: false,
      isSelled: false,
      isUsed: false,
    });
    await this.auctionrepo.create(data);
    await this.productService.markAsUsed(data.product);
  }

  async getAllProducts(sellerId: string): Promise<Product[]> {
    return await this.productService.allProducts({
      sellerId,
      isDeleted: false,
      isUsed: false,
    });
  }

  async getAllAuctions(
    data: IReqGetAllDocDTO,
    userId?: string
  ): Promise<{ resData: PopulatedAuction[]; total: number }> {
    const { page, search, limit, sortValue, filters } = data;
    let skip = (page - 1) * limit
    let query: Record<string, any> = {};
    let sort: Record<string, any> = {};
    if (userId) {
      query.userId = userId;
    }
    let pipeline: any[] = [
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          "product.description": 0,
          "product.category": 0,
          "product.sellerId": 0,
          "product.productImage": 0,
          "product.isDeleted": 0,
          "product.isSelled": 0,
          "product.isUsed": 0,
          "product.createdAt": 0,
          "product.updatedAt": 0,
          "product.__v": 0,
        },
      },
    ];

    if (search && search.trim() !== "") {
      query["product.name"] = { $regex: `^${search.trim()}`, $options: "i" };
    }
    
    if (sortValue && sortValue.trim() !== "") {
      if (sortValue === "baseAsc") {
        sort = { basePrice : 1 };
      } else if (sortValue === "baseDesc") {
        sort = { basePrice : -1 };
      }
      pipeline.push({ $sort: sort})
    }
    if (Object.keys(filters).length !== 0 && filters) {
      for (let key in filters) {
        query[key] = filters[key];
      }
    }
    

    pipeline.push({
      $match: query,
    });

    
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    const [resData, total] = await Promise.all([
      this.auctionrepo.getAll(pipeline),
      this.auctionrepo.countDoucements(query),
    ]);

    return { resData, total };
  }

  async processAuctionEnds(): Promise<void> {
    const now = new Date()
    const endedCount = await this.auctionrepo.endDueAuctions(now)
  }

  async processAuctionStarts(): Promise<void> {
    const now = new Date()
    const startedCount = await this.auctionrepo.startDueAuctions(now);
    
  }
  async isEligibleForModification(query: Record<string, any>): Promise<boolean> {
    const auction = await this.auctionrepo.findOne(query)
    return auction ? true : false
  }



  async cancelAuction(id: string, userId: string): Promise<void> {
    const isValid = await this.isEligibleForModification({
      _id: id,
      userId,
      status: "scheduled",
      isSold: false,
      startAt: {$gt: new Date()}
    })

    if(!isValid){
      throw new CustomError(ResponseMessages.AUCTION_NOT_FOUND,HttpStatusCode.NOT_FOUND)
    }

    await this.auctionrepo.findByIdAndUpdate(id,{ status: "cancelled" })
  }
  async findOneAuction(query: Record<string, any>): Promise<Auction | null> {
    
    return await this.auctionrepo.findOne(query)
  }

  async unblockAuction(id: string, userId: string): Promise<void> {
    
    
    const auction = await this.findOneAuction({
      _id: id,
      userId,
      status: "cancelled",
      isSold: false,
      endAt: {$gt: new Date()}
    })
    
    if(!auction){
      throw new CustomError(ResponseMessages.AUCTION_NOT_FOUND,HttpStatusCode.NOT_FOUND)
    }
    const now = new Date()
    const startDate = new Date(auction.startAt)
    if(now < startDate){
      await this.auctionrepo.findByIdAndUpdate(id,{ status: "scheduled"})
    }else if(now > startDate){
      await this.auctionrepo.findByIdAndUpdate(id,{ status: "running"})
    }
  }
}
