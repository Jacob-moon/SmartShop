import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<void> {
  const product = await this.getProductById(id);
  Object.assign(product, updateProductDto);
  await this.productRepository.save(product);
}

async deleteProduct(id: number): Promise<void>{
  const result = await this.productRepository.delete({ id });
  if (result.affected === 0) {
    throw new NotFoundException('상품을 찾을 수 없습니다.')
  }
}
}
