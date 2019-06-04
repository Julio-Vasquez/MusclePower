import { Get, Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import Response from './../common/response';
import { CategoryDto } from './dto/category.dto';


@Controller('Category')
export class CategoryController{
    constructor(
        private readonly categoryService: CategoryService
    )
    {}

    @Post('CreateCategory')
    public async CreateCategory(@Body() categoryDto: CategoryDto): Promise<any>{
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
}