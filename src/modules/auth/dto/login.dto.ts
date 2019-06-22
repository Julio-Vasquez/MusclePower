import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {

    @ApiModelProperty({
        required: true,
        type: String('Email'),
        example: 'example@mail.com'
    })
    @IsNotEmpty()
    @IsEmail({}, {
        message: "El correo no cumple con su formato"
    })
    email: string;

    @ApiModelProperty({
        required: true,
        type: String,
        example: '*********'
    })
    @IsNotEmpty()
    @IsString()
    @Length(4, 30, {
        message: "La contraseña debe estar entre 4 a 30 letras"
    })
    password: string;
}