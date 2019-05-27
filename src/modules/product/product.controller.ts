import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import Response from '../common/response';

@ApiUseTags('Productos')
@Controller('Product')
export class productController {
  constructor() 
    {
    }
}