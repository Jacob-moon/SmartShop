import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { CurrentUser } from 'src/users/user.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Get()
  async getAll(): Promise<ProductResponseDto[]> {
    const products = await this.productsService.getAllProducts();
    return products.map(item => new ProductResponseDto(item));
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ):Promise<ProductResponseDto> {
    const product = await this.productsService.getProductById(id);
    return new ProductResponseDto(product);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(
    @Body() CreateProductDto: CreateProductDto,
    @CurrentUser('userId') userId:number,
  ) : Promise <{ id: number; message: string }> {
    const product = await this.productsService.createProduct(CreateProductDto);
    return { id: product.id, message: '상품이 등록되었습니다.' }
  }
  
}
