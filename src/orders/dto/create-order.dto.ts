import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateOrderDto {
  @IsInt({ message: '장바구니 ID는 숫자여야 합니다.' })
  @Min(1, { message: '장바구니 ID는 1 이상이어야 합니다.' })
  cart_id: number;

  @IsNotEmpty({ message: '결제 방법을 입력해주세요.' })
  payment_method: string; // 추후 enum 등으로 구체화 가능
}