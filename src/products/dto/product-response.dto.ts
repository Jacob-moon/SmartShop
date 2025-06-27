import { Product } from "../entities/product.entity";

export class ProductResponseDto {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    image_url?: string;
    created_at: Date;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.image_url = product.image_url;
        this.created_at = product.created_at;
      }
}