import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

async updateProduct(id: number, updateProductDto: UpdateProductDto, userId: number): Promise<void> {
  const product = await this.getProductById(id);
  // userId 변수가 선언되어 있지 않아서 오류가 발생합니다.
  // updateProduct 함수의 매개변수에 userId: number를 추가해야 합니다.
  if (product.user.id !== userId) {
    throw new ForbiddenException('수정 권한이 없습니다.')
  }
  Object.assign(product, updateProductDto);
  await this.productRepository.save(product);
}

async deleteProduct(id: number, userId: number): Promise<void>{
  const product = await this.getProductById(id);
  if(product.user.id !== userId) {
    throw new ForbiddenException('삭제 권한이 없습니다.')
  }
  await this.productRepository.delete({ id })
}
}
