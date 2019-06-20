import { Get, Controller, Post, Put, Body, HttpStatus, Param, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import Response from './../common/response/response';

import { Category } from './../../entities/category.entity';

import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';


@ApiUseTags('Categorias')
@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @ApiOperation({
        title: 'Creación de categorias',
        description: 'Operación metodo POST para crear categorias.'
    })
    @ApiResponse({
        status: 200,
        description: 'Categoria creada exitosamente',
    })
    @ApiResponse({
        status: 409,
        description: 'No se puede crear la categoria, debido a que ya exite ese registro'
    })
    @ApiResponse({
        status: 400,
        description: 'Jamas llego ningun dato al servidor'
    })
    @Post('createcategory')
    public async createCategory(@Body() categoryDto: CategoryDto): Promise<any> {
        if (categoryDto !== undefined) {
            const res: boolean = await this.categoryService.createCategory(categoryDto);
            if (res) {
                return Response
                    .status({ statusCode: HttpStatus.OK, state: 'OK' })
                    .message('Registro exitoso')
                    .json()
                ;
            }
            return Response
                .status({ statusCode: HttpStatus.CONFLICT, state: 'CONFLICT' })
                .message('Ya existe el registro')
                .json()
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.BAD_REQUEST, state: 'ERROR BAD_REQUEST' })
            .message('No ha llegado ningun dato al servidor')
            .json()
        ;
    }

    @ApiOperation({
        title: 'Listado de categorias',
        description: 'Operacion metodo GET para obtener el listado de categorias'
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de categorias obtenido correctamente, indicando que existe al menos 1 categoria'
    })
    @ApiResponse({
        status: 204,
        description: 'Operación exitosa, pero sin ningun registro de categoria encontrado'
    })
    @Get('listcategory')
    public async listCategory(): Promise<Category[]> {
        const res = await this.categoryService.listCategory();
        if (res.length > 0) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Correcto')
                .json({ data: res })
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
            .message('No hay registros de categorias.')
            .json({ data: [] })
        ;
    }

    @ApiOperation({
        title: 'Modificar una categoria',
        description: 'Metodo PUT para actualizar o modificar una categoria'
    })
    @ApiResponse({
        status: 200,
        description: 'La actualizacion de la categoria se completo exitosamente'
    })
    @ApiResponse({
        status: 204,
        description: 'No existe ninguna categoria con ese nombre, no se pudo actualizar'
    })
    @ApiResponse({
        status: 400,
        description: 'Jamas llego ningun dato al servidor'
    })
    @Put('updatecategory/:name')
    public async updateCategory(@Body() category: CategoryDto, @Param('name') name: string): Promise<any> {
        if(category !== undefined){
            const res: boolean = await this.categoryService.updateCategory(category, name);
            if (res) {
                return Response
                    .status({ statusCode: HttpStatus.OK, state: 'OK' })
                    .message('Actualisacion correcta')
                    .json({
                        data: {
                            old: name,
                            new: category.name
                        }
                    })
                ;
            } 
            return Response
                .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
                .message('No se pudo actualizar la categoria, no existe la categoria que desea actualizar')
                .json({ data: [] })
            ;
            
        }
        return Response
            .status({ statusCode: HttpStatus.BAD_REQUEST, state: 'ERROR BAD_REQUEST' })
            .message('No ha llegado ningun dato al servidor')
            .json()
        ;  
    }

    @ApiOperation({
        title: 'Eliminar categoria',
        description: 'Operacion metodo DELETE para eliminar una categoria'
    })
    @ApiResponse({
        status: 200,
        description: 'Categoria modificada o actualizada correctamente'
    })
    @ApiResponse({
        status: 304,
        description: 'No se pudo modificar la categoria'
    })
    @Delete('deletecategory/:id')
    public async deleteCategory(@Param('id') id: number): Promise<any> {
        const res: boolean = await this.categoryService.deleteCategory(id);
        if (res) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Categoria Eliminada')
                .json()
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.NOT_MODIFIED, state: 'NO DELETE' })
            .message('Categoria no fue Eliminada, no existe')
            .json()
        ;
    }
}