import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductOption } from './entities/product-option.entity';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { ProductOptionResponseDto } from './dto/product-option-response.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Injectable()
export class ProductOptionsService {
  constructor(
    @InjectRepository(ProductOption)
    private readonly optionRepository: Repository<ProductOption>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}

  async create(
    createProductOptionDto: CreateProductOptionDto, 
    userId: number
  ): Promise<ProductOptionResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id: createProductOptionDto.productId },
      relations: ['user'],
    })
    if(!product || product.user.id !== userId) {
      throw new ForbiddenException('상품 옵션을 등록할 권한이 없습니다.')
    }

    const option = this.optionRepository.create({
      ...createProductOptionDto,
      product,
    });
    const savedOption = await this.optionRepository.save(option);
    return new ProductOptionResponseDto(savedOption);
  }

  async findAll(): Promise<ProductOptionResponseDto[]> {
    const options = await this.optionRepository.find({
      relations: ['product'],
    });
    return options.map(option => new ProductOptionResponseDto(option));
  }

  async findOne(id: number): Promise<ProductOptionResponseDto> {
    const option = await this.optionRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if(!option) {
      throw new NotFoundException('옵션을 찾을 수 없습니다.');
    }
    return new ProductOptionResponseDto(option);
  }

  async getOptionsByProduct(productId: number): Promise<ProductOptionResponseDto[]> {
    const options = await this.optionRepository.find({
      where: { product: { id: productId } },
      relations: ['product'],
    });
    return options.map(option => new ProductOptionResponseDto(option));
  }

  async update(
    id: number, 
    updateProductOptionDto: UpdateProductDto, 
    userId: number
  ): Promise<ProductOptionResponseDto> {
    const option = await this.optionRepository.findOne({
      where: { id },
      relations: ['product', 'product.user'],
    })
    if(!option) {
      throw new NotFoundException('옵션을 찾을 수 없습니다.');
    }
     if(option.product.user.id !== userId) {
      throw new ForbiddenException('옵션을 수정할 권한이 없습니다.');
     }
     Object.assign(option, updateProductOptionDto);
     const updatedOption = await this.optionRepository.save(option);
     return new ProductOptionResponseDto(updatedOption);
  }
  
  async remove(id: number, userId: number): Promise<void> {
    const option = await this.optionRepository.findOne({
      where: { id },
      relations: ['product', 'product.user'],
    })
    if(!option) {
      throw new NotFoundException('옵션을 찾을 수 없습니다.');
    }
    if(option.product.user.id !== userId) {
      throw new ForbiddenException('옵션을 삭제할 권한이 없습니다.');
    }
    await this.optionRepository.delete({ id });
  }
}
