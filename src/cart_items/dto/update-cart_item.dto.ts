import { IsInt, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsInt({ message: '수량은 숫자여야 합니다.' })
  @Min(1, { message: '수량은 최소 1개 이상이어야 합니다.' })
  quantity: number;
}