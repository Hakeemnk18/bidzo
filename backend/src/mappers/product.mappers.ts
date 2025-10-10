import { IResProductDTO } from "../dtos/product.dto";
import { Product } from "../types/product.type";

export class ProductMapper {

    static toResProductDTO(product: Product): IResProductDTO{
        return {
            name: product.name,
            productImage: product.productImage,
            description: product.description,
            isDeleted: product.isDeleted,
            category: product.category.toString(),
            id: product.id!
        }
    }

    static toResProductAllDTO(products: Product[]): IResProductDTO[]{
        return products.map(this.toResProductDTO)
    }
}