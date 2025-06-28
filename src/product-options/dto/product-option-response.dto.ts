export class ProductOptionResponseDto {
  id: number;
  name: string;
  price_diff: number;
  stock: number;
  is_active: boolean;
  productId: number;

  constructor(option: any) {
    this.id = option.id;
    this.name = option.name;
    this.price_diff = option.price_diff;
    this.stock = option.stock;
    this.is_active = option.is_active;
    this.productId = option.product?.id || option.productId;
  }
}