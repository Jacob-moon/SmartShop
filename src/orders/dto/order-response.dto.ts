export class OrderResponseDto {
    id: number;
    total_price: number;
    status: 'pending' | 'paid' | 'shipped';
    created_at: Date;
    items: {
      product_option: string;
      quantity: number;
      price: number;
    }[];
  }  