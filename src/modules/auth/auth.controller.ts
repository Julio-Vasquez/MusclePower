import { Controller, Post, Body, HttpStatus, Put } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import Response from '../common/response/response';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';


@ApiUseTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) { }

    @ApiOperation({
        title: 'iniciar sesion',
        description: 'Login, metodo post para el inicio de sesión'
    })
    @ApiResponse({
        status: 200,
        description: 'Login Correcto'
    })
    @Post('/login')
    public async login(@Body() login: LoginDto): Promise<any> {

        let res = await this.authService.login(login);
        if (res !== undefined) {
            return Response
                .status({})
                .message()
                .json({
                    data: this.jwtService.sign(
                        {
                            res
                        }
                    )
                })
            ;
        }
    }

    @Post('/singup')
    public async signup(@Body() signup: SignUpDto) {
        return;
    }

    @Put()
    public async restorePassword() {
        return;
    }
}