import { ApiModelProperty } from '@nestjs/swagger';
import { Length, MinLength, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class ChangePasswordDto{

    @ApiModelProperty({
        required: true,
        type: String,
        minLength: 4
    })
    @IsEmail({}, {
        message: "El correo no cumple con su formato"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(10, {
        message: "El Correo no es valido"
    })
    readonly email: string;

    @ApiModelProperty({
        required: true,
        type: String,
        minLength: 4,
        maxLength: 30,
        default: '***********'
    })
    @Length(4, 30, {
        message: "La contraseña debe estar entre 4 a 30 letras"
    })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}