import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { CurrentUser } from 'src/users/user.decorator';
import { UpdateProductDto } from './dto/update-product.dto';

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
  
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser('userId') userId: number,
  ): Promise<{ message: string }> {
    await this.productsService.updateProduct(id, updateProductDto, userId);
    return { message: '상품 정보가 수정되었습니다.' }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
  ): Promise<{ message: string }> {
    await this.productsService.deleteProduct(id, userId);
    return { message: '상품이 삭제되었습니다.' }
  }
}
