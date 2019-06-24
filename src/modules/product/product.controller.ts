import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, UseGuards, FileFieldsInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import Response from './../common/response/response';
import { ProductService } from './product.service';
import { Product } from '../../entities/product.entity';
import { AuthGuard } from '@nestjs/passport';
import { ProductDto } from './dto/product.dto';

@ApiUseTags('Productos')
@Controller('product')
export class ProductController {

    constructor(
        private readonly service: ProductService,
    ) { }

    @ApiOperation({
        title: 'Listado de productos',
        description: 'Operacion metodo GET para obtener el listado de productos'
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de productos obtenido correctamente, indicando que existe al menos 1 marca'
    })
    @ApiResponse({
        status: 204,
        description: 'Operación exitosa, pero sin ningun registro de productos encontrado'
    })
    @Get('allproducts/')
    public async listProducts(): Promise<Product[]> {
        const res: Product[] = await this.service.findAll();
        if (res.length > 0) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Listado de productos cargado correctamente')
                .json({ data: res })
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
            .message('No existen registro de productos')
            .json()
        ;
    }

    @ApiOperation({
        title: 'Listado de productos filtrado por nombre',
        description: 'Operacion metodo GET para obtener el listado de productos'
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de productos obtenido correctamente, indicando que existe al menos 1 marca'
    })
    @ApiResponse({
        status: 204,
        description: 'Operación exitosa, pero sin ningun registro de productos encontrado'
    })
    @Get('allproducts/:name')
    public async listProductsbyName(@Param('name') name: string){
        const res: Product[] = await this.service.findByName(name);
        if (res.length > 0) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Listado de productos cargado correctamente')
                .json({ data: res })
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
            .message('No existen registro de productos')
            .json()
        ;
    }
    @Post('createproduct/')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileFieldsInterceptor([
        {
            name: 'imgProduct', maxCount: 1
        },
        {
            name: 'imgNutritionaltable', maxCount: 1
        }
    ]))
    public async createProduct(@Body() product: ProductDto) {

    }

    @Put('updateproduct/')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileFieldsInterceptor([
        {
            name: 'imgProduct', maxCount: 1
        },
        {
            name: 'imgNutritionaltable', maxCount: 1
        }
    ]))
    public async updateProduct(@Body() newProduct: ProductDto, @Param('ref') ref:number){

    }

    @Delete('deleteproduct/')
    @UseGuards(AuthGuard())
    public async deleteProduct(@Param('id') ref : number){

    }

    @Post('buyproduct/')
    @UseGuards(AuthGuard())
    public async buyProduct(@Param('id') ref : number){

    }

}