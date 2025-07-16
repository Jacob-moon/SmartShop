export class CartItemFlatDto {
  id: number;
  product_options_id: number;
  quantity: number;
  product_name: string;
  option_name: string;
  price: number;
}

export class CartFlatResponseDto {
  id: number;
  user_id: number;
  items: CartItemFlatDto[];
}
