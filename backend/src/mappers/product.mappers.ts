import { IResProductDTO, PopulatedProduct } from "../dtos/product.dto";
import { Product } from "../types/product.type";

export class ProductMapper {

    static toResProductDTO(product: PopulatedProduct): IResProductDTO{
        return {
            name: product.name,
            productImage: product.productImage,
            description: product.description,
            isDeleted: product.isDeleted,
            category: product.category.categoryName,
            id: product.id!
        }
    }

    static toResProductAllDTO(products: PopulatedProduct[]): IResProductDTO[]{
        return products.map(this.toResProductDTO)
    }
}