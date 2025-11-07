import { injectable, inject } from "tsyringe";
import { IBidCountService } from "./interfaces/bid.count.service.interface";
import { IBidCountDto, IBidCountWithId } from "../dtos/bid.count.dto";
import { IBidCountRepo } from "../repositories/interfaces/bid.count.repo";
import { validateBidPack } from "../utils/validations/bid.count";
import { IGetAllDocDBDTO, IReqGetAllDocDTO } from "../dtos/shared.dto";
import { CustomError } from "../utils/customError";
import { ResponseMessages } from "../constants/responseMessages";
import { HttpStatusCode } from "../constants/httpStatusCode";



@injectable()
export class BidCountService implements IBidCountService {
  constructor(
    @inject("IBidCountRepo") private bidCountRepo: IBidCountRepo
  ) {}

  async getAll(): Promise<IBidCountDto[]> {
    return await this.bidCountRepo.getAll();
  }

  async getByFilter(data: IReqGetAllDocDTO): Promise<{ resData: IBidCountWithId[], total: number}> {
     const { page, search, limit, sortValue, filters } = data;
        let query: Record<string, any> = {};
        let sort: Record<string, any> = {};
        if (search && search.trim() !== "") {
          query.categoryName = { $regex: `^${search.trim()}`, $options: "i" };
        }
    
        if (sortValue && sortValue.trim() !== "") {
          if (sortValue === "A-Z") {
            sort = { categoryName: 1 };
          } else if (sortValue === "Z-A") {
            sort = { categoryName: -1 };
          }
        }
        if (Object.keys(filters).length !== 0 && filters) {
          for (let key in filters) {
            query[key] = filters[key];
          }
        }
    
        let allDoc: IGetAllDocDBDTO = {
          page,
          limit,
          query,
          sort,
        };
        const [rData, total] = await Promise.all([
          this.bidCountRepo.getByFilter(allDoc),
          this.bidCountRepo.countDocument(query),
        ]);

        const resData: IBidCountWithId[] = rData.map((item)=>{
          return { bidCount: item.bidCount, amount: item.amount, _id: item.id!}
        })

    
        return { resData, total };
  }

  async getById(id: string): Promise<IBidCountDto | null> {
    return await this.bidCountRepo.getById(id);
  }

  async create(data: IBidCountDto): Promise<IBidCountDto> {
    const bidPack = await this.getAll()
    validateBidPack(bidPack,data)
    return await this.bidCountRepo.create(data);
  }

  async update(id: string, data: IBidCountDto): Promise<IBidCountDto | null> {
    return await this.bidCountRepo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const deletedBidPack = await this.bidCountRepo.delete(id);
    if(!deletedBidPack){
      throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }
  }
}