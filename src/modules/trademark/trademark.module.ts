import { Module, MulterModule, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrademarkService } from './trademark.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TrademarkController } from './trademark.controller';

import { Trademark } from './../../entities/trademark.entity';
import { JwtKey } from './../common/environment/environment';
import { AuthMiddleware } from '../common/middleware/user.middleware';

@Module({
    imports:[
        PassportModule.register({ defaultStrategy: 'bearer' }),
        JwtModule.register({ 
            secret: JwtKey
        }),
        TypeOrmModule.forFeature([Trademark]),
        MulterModule.registerAsync({
            useFactory: async (file) =>(
                file.configMulter()
            ),
            inject: ['UploadFile']
        })
    ],
    controllers:[TrademarkController],
    providers:[TrademarkService],
    exports:[]
})

export class TrademarkModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
        consumer
        .apply(AuthMiddleware)
        .exclude(
            { path: 'trademark/listtrademark/', method: RequestMethod.GET },
            { path: 'trademark/findbyname/', method: RequestMethod.GET }
        )
        .forRoutes(TrademarkController)
    }
}