import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message:'상품 이름을 입력해주세요' })
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsInt({ message: '가격은 숫자여야 합니다' })
    @Min(0, { message: '가격은 0 이상이여야 합니다.' })
    price: number;

    @IsInt({ message: '재고는 숫자여야합니다' })
    @Min(0, { message: '재고는 0 이상이여야 합니다.' })
    stock: number;

    @IsOptional()
    @IsString()
    image_url?: string;
}
