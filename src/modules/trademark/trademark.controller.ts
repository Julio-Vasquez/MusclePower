import { Controller, Post, Body, HttpStatus, Put, Param, Get, Delete } from '@nestjs/common';

import Response from './../common/response';
import { TrademarkService } from './trademark.service';
import { Trademark } from './../../entities/trademark.entity';
import { TrademarkDto } from './dto/trademark.dto';
 
@Controller('Trademark')
export class TrademarkController
{
    constructor(
        private readonly trademarkService: TrademarkService
    )
    {}

    @Post('createtrademark')
    public async createTrademark(@Body() trademarkDto: TrademarkDto): Promise<any>{
        if(trademarkDto !== undefined){
            const res = this.trademarkService.createTrademark(trademarkDto);
            if(res){
                return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK'})
                .message('Registro exitoso')
                .json()
            }
        }
    }

    @Get('listtrademark')
    public async listTrademark():Promise<Trademark[]>
    {
        return;
    }

    @Get('findByName/:name')
    public async findByName(@Param('name') name: string): Promise<Trademark>{
        return ;
    }

    @Put('updatetrademark/:name')
    public async updateTrademark(@Body() trademark: TrademarkDto, @Param('name') name: string): Promise<boolean>{
        return ;
    }

    @Delete('deletetrademark/:id')
    public async deleteTrademark(@Param('id') id: number): Promise<boolean>{
        return ;
    }


}