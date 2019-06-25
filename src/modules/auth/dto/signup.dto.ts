import { ApiModelProperty } from '@nestjs/swagger';
import {
    Length,
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsPhoneNumber,
    IsString
} from 'class-validator';

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

export class SignUpDto {
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
    @IsString()
    @MinLength(4, {
        message: "El Apellido debe contener al menos 4 caracteres"
    })
    @MaxLength(40, {
        message: "El Apellido debe contener maximo 45 caracteres"
    })
    @IsNotEmpty()
    readonly lastnames: string;

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
    
    @IsPhoneNumber('CO')
    @IsNotEmpty()
    @Length(10, 15, {
        message: "El celular debe estar entre 10 a 15 números"
    })
    readonly telephone: string;
/*
  @ApiModelProperty({
        required: true,
        type: String,
        minLength: 4,
        maxLength: 5,
        enum: ['admin', 'user']
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(UserRole)
    @Length(4, 5)
    public readonly role: string;
*/
}

