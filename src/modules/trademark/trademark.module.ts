import { Module, MulterModule } from '@nestjs/common';

import { TrademarkService } from './trademark.service';

import { TrademarkController } from './trademark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trademark } from './../../entities/trademark.entity';


@Module({
    imports:[
        TypeOrmModule.forFeature([Trademark]),
        MulterModule.registerAsync({
            useFactory: async (file) =>(file.configMulter('Trademarks')),
            inject: ['UploadFile']
        })
    ],
    controllers:[TrademarkController],
    providers:[TrademarkService],
    exports:[]
})

export class TrademarkModule{}