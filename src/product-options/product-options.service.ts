import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductOption } from './entities/product-option.entity';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { ProductOptionResponseDto } from './dto/product-option-response.dto';

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

  
}
