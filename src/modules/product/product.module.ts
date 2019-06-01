import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { productController } from './product.controller';
import { productService } from './product.service';

import { Product } from './../../entities/product.entity';
import { Trademark } from './../../entities/trademark.entity';
import { Category } from './../../entities/category.entity';



@Module({
  imports:[
    TypeOrmModule.forFeature([Trademark])
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class productModule {}