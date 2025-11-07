import { IBidCountDto } from "../../dtos/bid.count.dto";
import { IGetAllDocDBDTO } from "../../dtos/shared.dto";
import { BidPack } from "../../types/bid.pack";

export interface IBidCountRepo {
  getAll(): Promise<IBidCountDto[]>;
  getById(id: string): Promise<IBidCountDto | null>;
  create(data: IBidCountDto): Promise<IBidCountDto>;
  update(id: string, data: IBidCountDto): Promise<IBidCountDto | null>;
  delete(id: string): Promise<IBidCountDto | null>;
  getByFilter(data: IGetAllDocDBDTO): Promise<BidPack[]>
  countDocument(query: Record< string, any>): Promise<number>
}