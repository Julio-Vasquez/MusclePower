import { ApiModelProperty } from '@nestjs/swagger';
import {
    Length,
    MinLength,
    MaxLength,
    IsNotEmpty,
    IsString,
    IsEmail,
    IsNumber,
    IsPhoneNumber
} from 'class-validator';

export class UserDto {
    @ApiModelProperty({
        required: true,
        type: String,
        minLength: 4,
        maxLength: 40
    })
    @MinLength(4, {
        message: "El nombre debe contener al menos 4 caracteres"
    })
    @MaxLength(40, {
        message: "El nombre debe contener maximo 45 caracteres"
    })
    @IsNotEmpty()
    @IsString()
    readonly names: string;

    @ApiModelProperty({
        required: true,
        type: String,
        minLength: 4,
        maxLength: 40
    })
    @MinLength(4, {
        message: "El Apellido debe contener al menos 4 caracteres"
    })
    @MaxLength(40, {
        message: "El Apellido debe contener maximo 45 caracteres"
    })
    @IsNotEmpty()
    readonly lastNames: string;

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

    @ApiModelProperty({
        required: true,
        type: String,
        minLength: 10,
        maxLength: 15
    })
    @IsNumber()
    @IsPhoneNumber('CO')
    @IsNotEmpty()
    @Length(10, 15, {
        message: "El celular debe estar entre 10 a 15 números"
    })
    readonly telephone: string;
}