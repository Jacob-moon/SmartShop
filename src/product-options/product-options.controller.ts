import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductOptionsService } from './product-options.service';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { CurrentUser } from 'src/users/user.decorator';
import { ProductOptionResponseDto } from './dto/product-option-response.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';

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

  @Get()
  async findAll(): Promise<ProductOptionResponseDto[]> {
    return this.productOptionsService.findAll();
  }
  
  @Get('product/:productId')
  async getOptionsByProduct(
    @Param('ProductId',ParseIntPipe) productId: number,
  ): Promise<ProductOptionResponseDto[]> {
    return this.productOptionsService.getOptionsByProduct(productId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductOptionResponseDto> {
    return this.productOptionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id:number,
    @Body() updateProductOptionDto: UpdateProductOptionDto,
    @CurrentUser('userId') userId: number,
  ): Promise<ProductOptionResponseDto> {
    return this.productOptionsService.update(id, updateProductOptionDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
  ): Promise<{ message: string }> {
    await this.productOptionsService.remove(id, userId);
    return { message: '옵션이 삭제되었습니다.' }
  }
}
