import { Module, MulterModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrademarkService } from './trademark.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TrademarkController } from './trademark.controller';

import { Trademark } from './../../entities/trademark.entity';
import { JwtKey } from './../common/environment/environment';

@Module({
    imports:[
        PassportModule.register({ defaultStrategy: 'bearer' }),
        JwtModule.register({ 
            secret: JwtKey
        }),
        TypeOrmModule.forFeature([Trademark]),
        MulterModule.registerAsync({
            useFactory: async (file) =>(file.configMulter('Trademarks',1000000)),
            inject: ['UploadFile']
        })
    ],
    controllers:[TrademarkController],
    providers:[TrademarkService],
    exports:[]
})

export class TrademarkModule{}