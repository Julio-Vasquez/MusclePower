import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import Response from '../common/response';
import { ProductService } from './product.service';
import { Product } from '../../entities/product.entity';

@ApiUseTags('Productos')
@Controller('Product')
export class ProductController {

  constructor(private readonly service: ProductService) 
  {
  }

    @Get('allProducts')
    public async findAll(): Promise<Product[]>
    {
      return Response
      .status({ status : HttpStatus.OK, state: 'OK'})
      .message('Operaccion exitosa')
      .json(this.service.findAll())
      ;
    }
}