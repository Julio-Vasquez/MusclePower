import { ApiModelProperty } from '@nestjs/swagger';
import { 
    Length,
    IsEmail, 
    IsDateString, 
    IsEnum, 
    IsNotEmpty,
    MaxLength,
    MinLength
} from 'class-validator';

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

export enum Gender {
    M = "Masculino",
    F = "Femenino"
}

export class SignupDto {
    @ApiModelProperty()
    @MinLength(4,{ message: "El nombre debe contener al menos 4 caracteres" })
    @MaxLength(40,{ message: "El nombre debe contener maximo 45 caracteres"})
    @IsNotEmpty()
    readonly name: string;

    @ApiModelProperty()
    @MinLength(4,{ message: "El Apellido debe contener al menos 4 caracteres" })
    @MaxLength(40,{ message: "El Apellido debe contener maximo 45 caracteres"})
    @IsNotEmpty()
    readonly lastname: string;

    @ApiModelProperty()
    @IsEmail({}, { message: "El correo no cumple con su formato" })
    @IsNotEmpty()
    @MinLength(10,{ message: "El Correo no es valido" })
    readonly email: string;
    
    @ApiModelProperty()
    @Length(4, 30, { message: "La contraseña debe estar entre 4 a 30 letras" })
    @IsNotEmpty() 
    readonly password: string;

    @ApiModelProperty({ enum: ['M', 'F'] })
    @IsNotEmpty()
    @IsEnum(Gender)
    readonly role: string;

    @ApiModelProperty({ enum: ['M', 'F'] })
    @IsNotEmpty()
    @IsEnum(Gender)
    readonly genero: string;

    @ApiModelProperty()
    @Length(10, 15, { message: "El celular debe estar entre 10 a 15 números" })
    readonly telephone: string;
    
    @ApiModelProperty()
    @IsDateString() 
    readonly birthdate: string;
}