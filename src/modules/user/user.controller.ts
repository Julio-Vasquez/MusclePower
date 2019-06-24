import { Controller, Body, HttpStatus, Put, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import Response from './../common/response/response';
import { User } from "./../../entities/user.entity";
import { UserService } from './user.service';

import { UserDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/changepassword.dto';

@ApiBearerAuth()
@ApiUseTags('Usuario')
@Controller('user')
export class UserController {
    constructor(
        private readonly users: UserService
    ) { }

    @ApiOperation({ title: 'Listado de usuarios' })
    @ApiResponse({
        status: 200,
        description: 'devuelve el listado de usuarios existentes.',
    })
    @ApiResponse({
        status: 204,
        description: 'no se encuentra ningun usuario en el sistema.',
    })
    @Get('listssers/')
    @UseGuards(AuthGuard())
    public async listUsers() {
        let res = await this.users.ListUsers();
        if (res.length > 0) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Operacion Completa')
                .json({ data: res })
            ;
        }
        return Response
            .status({ status: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
            .message('No existen mas usuarios')
            .json()
        ;
    }

    @ApiOperation({ title: 'busqueda de usuarios' })
    @ApiResponse({
        status: 200,
        description: 'devuelve el listado de usuarios existentes.',
    })
    @ApiResponse({
        status: 204,
        description: 'no se encuentra ningun usuario en el sistema que coincida con los parametros de busqueda.',
    })
    @Get('findusers/:name')
    @UseGuards(AuthGuard())
    public async listUsersByName(@Param('name') name: string): Promise<User[]> {
        let res: User[] = await this.users.findByName(name);
        if (res.length > 0) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Operacion completada')
                .json({ data: res })
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
            .message('No hay usuarios que coincidan con su busqueda')
            .json({ data: [] })
        ;
    }

    @ApiOperation({
        title: 'Modificar unusuario',
        description: 'Metodo PUT para actualizar o modificar un usuario'
    })
    @ApiResponse({
        status: 200,
        description: 'La actualizacion del usuario se completo exitosamente'
    })
    @ApiResponse({
        status: 204,
        description: 'No existe ningun usuario con ese nombre, no se pudo actualizar'
    })
    @ApiResponse({
        status: 400,
        description: 'Jamas llego ningun dato al servidor'
    })
    @Put('updateuser/:email')
    @UseGuards(AuthGuard())
    public async updateUser(@Body() user: UserDto, @Param('email') email: string) {
        if(user !== undefined){
            const res: boolean = await this.users.updateUser(user, name);
            if (res) {
                return Response
                    .status({ statusCode: HttpStatus.OK, state: 'OK' })
                    .message('Actualisacion correcta')
                    .json({
                        data: {
                            old: name,
                            new: user
                        }
                    })
                ;
            } 
            return Response
                .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
                .message('No se pudo actualizar el usuario, no existe el usuario que desea actualizar')
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
        title: 'Eliminar Usuario',
        description: 'Operacion metodo DELETE para eliminar un usuario'
    })
    @ApiResponse({
        status: 200,
        description: 'usuario eliminado correctamente'
    })
    @ApiResponse({
        status: 304,
        description: 'No se pudo eliminar el usuario, probablemente no provee una id valida'
    })
    @Delete('deleteuser/:id')
    @UseGuards(AuthGuard())
    public async deleteUser(@Param('id') id: number) {
        const res: boolean = await this.users.deleteUser(id);
        if (res) {
            return Response
                .status({ statusCode: HttpStatus.OK, state: 'OK' })
                .message('Usuario Eliminada')
                .json()
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.NOT_MODIFIED, state: 'NO DELETE' })
            .message('usuario no fue Eliminada, no existe')
            .json()
        ;
    }

    @ApiOperation({
        title: 'Modificar unusuario',
        description: 'Metodo PUT para actualizar la contraseña'
    })
    @ApiResponse({
        status: 200,
        description: 'La actualizacion de la contraseña se completo exitosamente'
    })
    @ApiResponse({
        status: 204,
        description: 'No existe ningun usuario con ese email, no se pudo actualizar la contraseña'
    })
    @ApiResponse({
        status: 400,
        description: 'Jamas llego ningun dato al servidor'
    })
    @Put('changepassword/')
    @UseGuards(AuthGuard())
    public async changePassword(@Body() pwd: ChangePasswordDto){
        if(pwd !== undefined){
            const res: boolean = await this.users.changePassword(pwd);
            if (res) {
                return Response
                    .status({ statusCode: HttpStatus.OK, state: 'OK' })
                    .message('cambio de contraseña exitoso ')
                    .json()
                ;
            } 
            return Response
                .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
                .message('No se pudo cambiar la contraseña, no existe el usuario que desea actualizar')
                .json({ data: [] })
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.BAD_REQUEST, state: 'ERROR BAD_REQUEST' })
            .message('No ha llegado ningun dato al servidor')
            .json()
        ;  
    }
}