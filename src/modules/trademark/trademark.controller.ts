import { 
    Controller,
    Post, 
    Body, 
    HttpStatus, 
    Put, 
    Param, 
    Get, 
    Delete, 
    UploadedFile, 
    UseInterceptors,
    FileInterceptor,
    UseGuards 
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import{ AuthGuard } from '@nestjs/passport';

import Response from './../common/response/response';
import { TrademarkService } from './trademark.service';
import { Trademark } from './../../entities/trademark.entity';
import { TrademarkDto } from './dto/trademark.dto';
import { appHost } from './../common/environment/environment';
import { Files } from '../common/files/files';

@ApiUseTags('Marcas')
@Controller('trademark')
export class TrademarkController
{
    constructor(
        private readonly trademarkService: TrademarkService,
    )
    {}

    @ApiOperation({
        title: 'Creación de Marcas',
        description: 'Operación metodo POST para crear Marcas.'
    })
    @ApiResponse({
        status: 200,
        description: 'Marca creada exitosamente',
    })
    @ApiResponse({
        status: 409,
        description: 'No se puede crear la Marca, debido a que ya exite ese registro'
    })
    @ApiResponse({
        status: 400,
        description: 'Jamas llego ningun dato al servidor'
    })
    @Post('createtrademark')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('trademarkImg'))
    public async createTrademark(@Body() trademark: TrademarkDto, @UploadedFile() file): Promise<any>{
        if(trademark !== undefined && file){
            const res:boolean = await this.trademarkService.createTrademark(trademark, (appHost +'/'+ file.path) );
            console.log(res);
            if(res){
                return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK'})
                .message('Registro exitoso')
                .json()
            }
            return Response
                .status({ statusCode: HttpStatus.CONFLICT, state: 'CONFLICT' })
                .message('Ya existe el registro')
                .json()
            ;
        } 
        const fl = new Files();
        fl.deleteFile([file.path]);
        return Response
            .status({ statusCode: HttpStatus.BAD_REQUEST, state: 'ERROR BAD_REQUEST' })
            .message('No ha llegado ningun dato al servidor')
            .json()
        ;
    }

    @ApiOperation({
        title: 'Listado de Marcas',
        description: 'Operacion metodo GET para obtener el listado de marcas'
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de marcas obtenido correctamente, indicando que existe al menos 1 marca'
    })
    @ApiResponse({
        status: 204,
        description: 'Operación exitosa, pero sin ningun registro de marca encontrado'
    })
    @Get('listtrademark')
    public async listTrademark():Promise<Trademark[]>
    {
        const res: Trademark[] = await this.trademarkService.listTrademark();
        if(res.length > 0) {
            return Response
                .status({statusCode: HttpStatus.OK, state: 'OK'})
                .message('Correcto')
                .json({data: res})
            ;
        }
        return Response
            .status({statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
            .message('No existe ningun registro de marca')
            .json({data: [] })
        ;  
    }

    @ApiOperation({
        title: 'busqueda de Marcas',
        description: 'Operacion metodo GET para obtener una marca en especifico'
    })
    @ApiResponse({
        status: 200,
        description: 'Marca obtenido correctamente, indicando que existe una marca con ese nombre'
    })
    @ApiResponse({
        status: 204,
        description: 'Operación exitosa, pero sin ningun registro de marca encontrado'
    })
    @Get('findbyname/:name')
    public async findByName(@Param('name') name: string): Promise<Trademark>{
        const res : Trademark = await this.trademarkService.findByName(name);
        if(res !== undefined){
            return Response
                .status({statusCode: HttpStatus.OK, state: 'OK'})
                .message('Correcto')
                .json({data: res})
            ;
        }
        return Response
            .status({statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
            .message('No existe ningun registro de marca como el que busca')
            .json({data: [] })
        ;
    }

    @ApiOperation({
        title: 'Modificar una Marca',
        description: 'Metodo PUT para actualizar o modificar una Marca'
    })
    @ApiResponse({
        status: 200,
        description: 'La actualizacion de la Marca se completo exitosamente'
    })
    @ApiResponse({
        status: 204,
        description: 'No existe ninguna Marca con ese nombre, no se pudo actualizar'
    })
    @ApiResponse({
        status: 400,
        description: 'Jamas llego ningun dato al servidor'
    })
    @Put('updatetrademark/:name')
    @UseGuards(AuthGuard())
    public async updateTrademark(@Body() trademark: TrademarkDto, @Param('name') name: string): Promise<boolean>{
        if(trademark !== undefined){
            const res: boolean = await this.trademarkService.updateTrademark(trademark, name);
            if (res) {
                return Response
                    .status({ statusCode: HttpStatus.OK, state: 'OK' })
                    .message('Actualisacion correcta')
                    .json({
                        data: {
                            old: name,
                            new: trademark.name
                        }
                    })
                ;
            } 
            return Response
                .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
                .message('No se pudo actualizar la Marca, no existe la Marca que desea actualizar')
                .json({ data: [] })
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.BAD_REQUEST, state: 'ERROR BAD_REQUEST' })
            .message('No ha llegado ningun dato al servidor')
            .json()
        ;
    }

    @ApiOperation({
        title: 'Eliminar categoria',
        description: 'Operacion metodo DELETE para eliminar una Marca'
    })
    @ApiResponse({
        status: 200,
        description: 'Marca modificada o eliminado correctamente'
    })
    @ApiResponse({
        status: 304,
        description: 'No se pudo eliminar la Marca'
    })
    @Delete('deletetrademark/:id')
    @UseGuards(AuthGuard())
    public async deleteTrademark(@Param('id') id: number): Promise<boolean>{
        const res: boolean = await this.trademarkService.deleteTrademark(id);
        if (res) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Marca Eliminada')
                .json()
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.NOT_MODIFIED, state: 'NO DELETE' })
            .message('Marca no fue Eliminada, no existe')
            .json()
        ;
    }


}