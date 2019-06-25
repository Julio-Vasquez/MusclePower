import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './../../entities/category.entity';
import { CategoryController } from './category.controller';
import { JwtKey } from './../common/environment/environment';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from '../common/middleware/user.middleware';


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

export class CategoryModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
        consumer
        .apply(AuthMiddleware)
        .exclude(
            { path: 'category/listcategory', method: RequestMethod.GET }
        )
        .forRoutes( CategoryModule )
    }
}