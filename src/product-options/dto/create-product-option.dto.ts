import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateProductOptionDto {
    @IsNotEmpty({ message: '상품 ID를 입력해주세요' })
    @IsInt({ message: '상품 ID는 숫자여야 합니다' })
    productId: number;

    @IsNotEmpty({ message: '옵션 이름을 입력해주세요' })
    @IsString()
    name: string;

    @IsInt({ message: '가격 차이는 숫자여야 합니다' })
    price_diff: number;

    @IsOptional()
    @IsInt({ message: '재고는 숫자여야 합니다.' })
    @Min(0,{ message: '재고는 0이상이여야 합니다.' })
    stock?: number;

    @IsNotEmpty({ message: '활성화 여부를 입력해주세요.' })
    @IsBoolean()
    is_active: boolean;
}
