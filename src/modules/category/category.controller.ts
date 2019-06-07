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
        if(categoryDto !== undefined){
            const res = this.categoryService.createCategory2(categoryDto);
            if(res){
                return Response
                .status({ status: HttpStatus.OK, state: 'OK'})
                .message('Registro exitoso')
                .json()
            }
        }
    }

    @Get('listcategory')
    public async listCategory():Promise<Category[]>
    {
        return;
    }

    @Get('findbyname/:name')
    public async findByName(@Param('name') name: string): Promise<Category>{
        return ;
    }

    @Put('updatecategory/:name')
    public async updateCategory(@Body() category: CategoryDto, @Param('name') name: string): Promise<boolean>{
        return ;
    }

    @Delete('deletecategory/:id')
    public async deleteCategory(@Param('id') id: number): Promise<boolean>{
        return ;
    }
}