import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResponseDto } from './dto/product-response.dto';

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

  
}
