import { ICreateAuctionDTO, PopulatedAuction } from "../../dtos/auction.dto";
import { PopulatedProduct } from "../../dtos/product.dto";
import { IGetAllDocDBDTO } from "../../dtos/shared.dto";
import { Auction } from "../../types/auction";

export interface IAuctionRepo {
  create(data: ICreateAuctionDTO): Promise<void>;
  getAll(pipeline: any[]): Promise<PopulatedAuction[]>;
  countDocuments(pipeline: any[]): Promise<number>;
  startDueAuctions(date: Date): Promise<number>;
  endDueAuctions(date: Date): Promise<number>;
  findOne(query: Record<string, any>): Promise<Auction | null>;
  findOneAndUpdate(
    filter: Record<string, any>,
    update: Record<string, any>
  ): Promise<void>;
  findByIdAndUpdate(id: string, query: Record<string, any>): Promise<void>;
  findOneWithPopulated(
    query: Record<string, any>
  ): Promise<PopulatedAuction | null>;
  updateAndReturn(
    id: string,
    query: Record<string, any>
  ): Promise<Auction | null>;
  findAllEnded(query: Record<string, any>): Promise<Auction[]>;
  findAllLiveAuction(): Promise<Auction[]>;
  getAllLiveAuctionProducts(): Promise<string[]>;
  findAuctions(query: Record<string, any>): Promise<Auction[]>;
}
