import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './../../entities/category.entity';
import { CategoryController } from './category.controller';
import { JwtKey } from './../common/environment/environment';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports:[        
        PassportModule.register({ defaultStrategy: 'bearer' }),
        JwtModule.register({ 
            secret: JwtKey
        }),
        TypeOrmModule.forFeature([Category])],
    controllers:[CategoryController],
    providers:[CategoryService,],
    exports:[]
})

export class CategoryModule{}