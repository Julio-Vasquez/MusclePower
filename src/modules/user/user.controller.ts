import { Controller, Post, Body, HttpStatus, Put, Param, Get, Delete } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import Response from './../common/response/response';

import { UserService } from './user.service';
import { User } from "./../../entities/user.entity";

@ApiBearerAuth()
@ApiUseTags('Usuario')
@Controller('user')
export class UserController {
    constructor(
        private readonly users: UserService
    ) {}

    @ApiOperation({ title: 'Listado de usuarios' })
    @ApiResponse({
        status: 200,
        description: 'devuelve el listado de usuarios existentes.',
    })
    @Get('listssers/')
    public async listUsers() {
        let res = await this.users.ListUsers();
        if (res.length >= 1) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Operacion Completa')
                .json({data: res})
            ;
        } else {
            return Response
                .status({ status: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
                .message('No existen mas usuarios')
                .json()
            ;
        }
    }
    @Get('listusers/:name')
    public async listUsersByName(@Param('name') name: string): Promise<User[]>{
        let res:User[] =await  this.users.findByName(name);
        if(res.length > 0){
            return Response
            .status({ statusCode: HttpStatus.OK, state: 'OK'})
            .message('Operacion completada')
            .json({data:res})
        } 

    }

    @Put()
    public async updateUser() {

    }
}