import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    HttpStatus, 
    UseGuards, 
    FileFieldsInterceptor, 
    UploadedFiles,
    UseInterceptors 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import Response from './../common/response/response';
import { ProductService } from './product.service';
import { Product } from './../../entities/product.entity';
import { appHost } from './../common/environment/environment';
import { ProductDto } from './dto/product.dto';
import { BuyDto } from './dto/buy.dto';
import { Files } from './../common/files/files';

@ApiUseTags('Productos')
@Controller('product')
export class ProductController {

    constructor(
        private readonly service: ProductService,
    ) { }
    private readonly fl = new Files();


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

    @ApiOperation({
        title: 'Creación de Productos',
        description: 'Operación metodo POST para crear Produtos.'
    })
    @ApiResponse({
        status: 200,
        description: 'Producto creada exitosamente',
    })
    @ApiResponse({
        status: 409,
        description: 'No se puede crear el producto, debido a que ya exite ese registro'
    })
    @ApiResponse({
        status: 400,
        description: 'Jamas llego ningun dato al servidor'
    })
    @Post('createproduct/')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileFieldsInterceptor([
        {
            name: 'imgProduct', maxCount: 1
        },
        {
            name: 'imgNutritionalTable', maxCount: 1
        }
    ]))
    public async createProduct(@Body() product: ProductDto, @UploadedFiles() file) {
        if(product !== undefined && file){
            const res:boolean = await this.service.createProduct(product, (appHost + '/' + file.imgProduct[0].path), (appHost + '/'+ file.imgNutritionalTable[0].path));
            if(res){
                return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK'})
                .message('Registro exitoso')
                .json()
            }
            return Response
                .status({ statusCode: HttpStatus.CONFLICT, state: 'CONFLICT' })
                .message('Ya existe el registro')
                .json()
            ;
        } 
        this.fl.deleteFile([file.imgProduct[0].path, file.imgNutritionalTable[0].path]);
        return Response
            .status({ statusCode: HttpStatus.BAD_REQUEST, state: 'ERROR BAD_REQUEST' })
            .message('No ha llegado ningun dato al servidor')
            .json()
        ;
    }

    @ApiOperation({
        title: 'Creación de Productos',
        description: 'Operación metodo PUT para actualizar Produtos.'
    })
    @ApiResponse({
        status: 200,
        description: 'Producto actualizado exitosamente',
    })
    @ApiResponse({
        status: 409,
        description: 'No se puede actualizar el producto, debido a que no se encontro el registro a actualizar'
    })
    @ApiResponse({
        status: 400,
        description: 'Jamas llego ningun dato al servidor'
    })
    @Put('updateproduct/:name')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileFieldsInterceptor([
        {
            name: 'imgProduct', maxCount: 1
        },
        {
            name: 'imgNutritionalTable', maxCount: 1
        }
    ]))
    public async updateProduct(@Body() newProduct: ProductDto, @Param('name') ref:string, @UploadedFiles() file){
        if( newProduct !== undefined  && file){
            const res = await this.service.updateProduct(ref,newProduct,(appHost + '/' + file.imgProduct[0].path),(appHost + '/'+ file.imgNutritionalTable[0].path));
            if(res){
                return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK'})
                .message('Actualizacion exitosa')
                .json()
            }
            return Response
                .status({ statusCode: HttpStatus.CONFLICT, state: 'CONFLICT' })
                .message('No se pudo actualizar')
                .json()
            ;
        }
        this.fl.deleteFile([file.imgProduct[0].path, file.imgNutritionalTable[0].path]);
        return Response
            .status({ statusCode: HttpStatus.BAD_REQUEST, state: 'ERROR BAD_REQUEST' })
            .message('No ha llegado ningun dato al servidor')
            .json()
        ;
    }

    @ApiOperation({
        title: 'Eliminar Producto',
        description: 'Operacion metodo DELETE para eliminar un Producto'
    })
    @ApiResponse({
        status: 200,
        description: 'producto modificada o eliminado correctamente'
    })
    @ApiResponse({
        status: 304,
        description: 'No se pudo eliminar el producto'
    })
    @Delete('deleteproduct/:id')
    @UseGuards(AuthGuard())
    public async deleteProduct(@Param('id') ref : number){
        const res= await this.service.deleteProduct(ref)
        if (res) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('producto Eliminada')
                .json()
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.NOT_MODIFIED, state: 'NO DELETE' })
            .message('producto no fue Eliminada, no existe')
            .json()
        ;
    }

    @ApiOperation({
        title: 'Creación de Productos',
        description: 'Operación metodo PUT para actualizar Produtos.'
    })
    @ApiResponse({
        status: 200,
        description: 'Producto comprado exitosamente',
    })
    @ApiResponse({
        status: 409,
        description: 'No se realizar la compra, la cantidad de productos existentes es menor a lo requerido'
    })
    @Post('buyproduct/')
    @UseGuards(AuthGuard())
    public async buyProduct(@Body() buy: BuyDto){
        const res = await this.service.buyProduct(buy);
        if(res){
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Compra exitosa')
                .json()
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.CONFLICT, state: 'CONFLICT' })
            .message('Cantidad de productos insuficientes a lo requerido')
            .json()
        ;
    }
}