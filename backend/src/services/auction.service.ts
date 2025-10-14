import { ICreateAuctionDTO } from "../dtos/auction.dto";
import { IAuctionRepo } from "../repositories/interfaces/auction.repo";
import { Product } from "../types/product.type";
import { IAuctionService } from "./interfaces/auction.intercafe";
import { inject, injectable } from "tsyringe";
import { IProductService } from "./interfaces/product.interface";

@injectable()
export class AuctionService implements IAuctionService {
    constructor(
        @inject('IAuctionRepo') private readonly auctionrepo: IAuctionRepo,
        @inject('IProductService') private readonly productService: IProductService 
    ){}

    async create(data: ICreateAuctionDTO): Promise<void> {
        await this.auctionrepo.create(data)
    }


    async getAllProducts(sellerId: string): Promise<Product[]> {
        return await this.productService.allProducts({sellerId, isDeleted: false})
    }
}