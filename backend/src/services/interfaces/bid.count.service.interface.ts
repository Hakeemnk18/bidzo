import { IBidCountDto, IBidCountWithId } from "../../dtos/bid.count.dto";
import { IReqGetAllDocDTO } from "../../dtos/shared.dto";


export interface IBidCountService {
  getAll(): Promise<IBidCountDto[]>;
  getById(id: string): Promise<IBidCountDto | null>;
  create(data: IBidCountDto): Promise<IBidCountDto>;
  update(id: string, data: IBidCountDto): Promise<IBidCountDto | null>;
  delete(id: string): Promise<void>;
  getByFilter(data: IReqGetAllDocDTO): Promise<{ resData: IBidCountWithId[], total: number}>
}