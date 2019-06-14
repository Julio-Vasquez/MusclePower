import { Get, Controller, Post,Put, Body, HttpStatus, Param, Delete } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import Response from './../common/response';
import { Category } from './../../entities/category.entity';


@Controller('Category')
export class CategoryController
{
    constructor(
        private readonly categoryService: CategoryService
    )
    {}

    @Post('createcategory')
    public async createCategory(@Body() categoryDto: CategoryDto): Promise<any>{
        if(categoryDto !== undefined)
        {
            const res =await  this.categoryService.createCategory(categoryDto);
            if(res){
                return Response
                .status({ status: HttpStatus.OK, state: 'OK'})
                .message('Registro exitoso')
                .json()
            }
        }
        else
        {
            return Response
            .status({status: HttpStatus.BAD_REQUEST, state: 'ERROR BAD_REQUEST'})
            .message('No ha llegado ningun dato al servidor')
            .json();
        }
    }

    @Get('listcategory')
    public async listCategory():Promise<Category[]>
    {
        let res = await this.categoryService.listCategory();
        if(res.length > 0 )
        {
            return Response
            .status({status: HttpStatus.OK, state: 'OK'})
            .message('Correcto')
            .json({data: res});
        }
        else
        {
            return Response
            .status({status: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
            .message('No hay registros de categorias.')
            .json({data:[]});
        }
    }

    @Put('updatecategory/:name')
    public async updateCategory(@Body() category: CategoryDto, @Param('name') name: string): Promise<boolean>{
        return ;
    }

    @Delete('deletecategory/:id')
    public async deleteCategory(@Param('id') id: number): Promise<any>{
        let res =await  this.categoryService.deleteCategory(id);
        console.log(res);
        if(res)
        {
            return Response
            .status({status: HttpStatus.OK, state: 'OK'})
            .message('Categoria Eliminada')
            .json({data:[]})
        }
        else
        {
            return Response
            .status({status: HttpStatus.NOT_MODIFIED, state: 'NO DELETE'})
            .message('Categoria no fue Eliminada')
            .json({data:[]})
        }
        
    }
}