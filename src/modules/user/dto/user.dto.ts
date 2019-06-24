import { ApiModelProperty } from '@nestjs/swagger';
import {
    Length,
    MinLength,
    MaxLength,
    IsNotEmpty,
    IsString,
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