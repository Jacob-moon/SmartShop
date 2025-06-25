import { IsInt, Min } from "class-validator";

export class CreateCartItemDto {
    @IsInt({ message: '상품 옵션 ID는 숫자여야 합니다.' })
    product_options_id:number

    @IsInt({ message: '수량은 숫자여야 합니다.' })
    @Min(1,{ message: '수량은 최소 1개 이상이여야 합니다.' })
    quantity: number;
}