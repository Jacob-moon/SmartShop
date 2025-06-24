import { PartialType } from '@nestjs/mapped-types';
import { CreateProductOptionDto } from './create-product-option.dto';

export class UpdateProductOptionDto extends PartialType(CreateProductOptionDto) {}
