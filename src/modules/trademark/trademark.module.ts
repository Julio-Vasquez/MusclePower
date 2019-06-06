import { Module } from '@nestjs/common';

import { TrademarkService } from './trademark.service';

import { TrademarkController } from './trademark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trademark } from './../../entities/trademark.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Trademark])],
    controllers:[TrademarkController],
    providers:[TrademarkService],
    exports:[]
})

export class TrademarkModule{}