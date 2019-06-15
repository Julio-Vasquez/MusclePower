import { Controller, Post, Body, HttpStatus, Put, Param, Get, Delete } from '@nestjs/common';
import Response from '../common/response';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiUseTags('Usuario')
@Controller('User')
export class UserController {
    constructor(
        private readonly users: UserService
    ) {}

    @ApiOperation({ title: 'Listado de usuarios' })
    @ApiResponse({
        status: 200,
        description: 'devuelve el listado de usuarios existentes.',
    })
    @Get('ListUsers/')
    public async listUsers() {
        let res = await this.users.ListUsers();
        if (res.length > 1) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Operacion Completa')
                .json(res)
            ;
        } else {
            return Response
                .status({ status: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
                .message('No existen mas usuarios')
                .json()
            ;
        }

    }

    @Put()
    public async updateUser() {

    }
}