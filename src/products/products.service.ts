import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
 constructor(
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>
 ){}

async createProduct(createProductDto: CreateProductDto): Promise<Product>{
  const product = this.productRepository.create(createProductDto);
  return await this.productRepository.save(product);
}

async getAllProducts(): Promise<Product[]>{
  return await this.productRepository.find();
}

async getProductById(id: number): Promise<Product> {
  const product = await this.productRepository.findOne({ where: { id } });
  if (!product) {
    throw new NotFoundException()
  }
  return product;
}


}
