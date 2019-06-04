import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

import { Product } from '../../entities/product.entity';
import { Trademark } from '../../entities/trademark.entity';
import { Category } from '../../entities/category.entity';



@Module({
  imports:[
    TypeOrmModule.forFeature([Product,Trademark,Category])
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: []
})
export class ProductModule {}