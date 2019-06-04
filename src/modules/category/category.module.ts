import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './../../entities/category.entity';
import { CategoryController } from './category.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Category])],
    controllers:[CategoryController],
    providers:[CategoryService],
    exports:[]
})

export class CategoryModule{}