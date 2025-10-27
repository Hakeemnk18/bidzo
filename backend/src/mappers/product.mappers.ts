import { IGetProductDTO, IResProductDTO, PopulatedProduct } from "../dtos/product.dto";
import { Product } from "../types/product.type";

export class ProductMapper {

    static toResProductDTO(product: PopulatedProduct): IResProductDTO{
        return {
            name: product.name,
            productImage: product.productImage,
            description: product.description,
            isDeleted: product.isDeleted,
            isUsed: product.isUsed,
            isSold: product.isSold,
            isDeletedByAdmin: product.isDeletedByAdmin,
            category: product.category.categoryName,
            id: product.id!
        }
    }

    static toGetProductDTO(product: PopulatedProduct): IGetProductDTO{

        return {
            name: product.name,
            productImage: product.productImage,
            description: product.description,
            isDeleted: product.isDeleted,
            isUsed: product.isUsed,
            isSold: product.isSold,
            category: product.category,
            id: product.id!,
            isDeletedByAdmin: product.isDeletedByAdmin,
        }
    }

    static toResProductAllDTO(products: PopulatedProduct[]): IResProductDTO[]{
        return products.map(this.toResProductDTO)
    }

    static toResAllProductNames(product: Product[]): {id: string, productName: string}[]{
        return product.map((item)=> {
            return { id: item.id!, productName: item.name}
        } )
    }
}