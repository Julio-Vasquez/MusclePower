import { Module, MulterModule, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

import { Product } from '../../entities/product.entity';
import { Trademark } from '../../entities/trademark.entity';
import { Category } from '../../entities/category.entity';

import { JwtKey } from './../common/environment/environment';
import { AuthMiddleware } from '../common/middleware/user.middleware';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.register({
      secret: JwtKey
    }),
    MulterModule.registerAsync({
      useFactory: async (file) => (
        file.configMulter()
      ),
      inject: ['UploadFile']
    }),
    TypeOrmModule.forFeature([Product, Trademark, Category])
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: []
})
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer){
      consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'product/allproducts', method: RequestMethod.GET },
        { path: 'product/allproducts/:name', method: RequestMethod.GET}
      )
      .forRoutes(ProductController)
      
    }
 }