import { Module } from '@nestjs/common';
import { ProductOptionsService } from './product-options.service';
import { ProductOptionsController } from './product-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOption } from './entities/product-option.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOption,Product])],
  controllers: [ProductOptionsController],
  providers: [ProductOptionsService],
  exports: [ProductOptionsService],
})
export class ProductOptionsModule {}
