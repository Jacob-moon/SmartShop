import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductOptionsService } from './product-options.service';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { CurrentUser } from 'src/users/user.decorator';
import { ProductOptionResponseDto } from './dto/product-option-response.dto';

@Controller('product-options')
export class ProductOptionsController {
  constructor(private readonly productOptionsService: ProductOptionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProductOptionDto: CreateProductOptionDto,
    @CurrentUser('userId') userId: number,
  ): Promise<ProductOptionResponseDto> {
    return this.productOptionsService.create(createProductOptionDto, userId);
  }

  
}
