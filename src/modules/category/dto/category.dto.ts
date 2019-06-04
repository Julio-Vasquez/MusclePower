import { IsEnum, IsNotEmpty, IsString, MinLength, MaxLength} from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export enum state{
    Active = 'Activo',
    Inactive = 'Inactivo'

}
export class CategoryDto{

    @ApiModelProperty({
        required: true,
        type: String,
        minLength:4,
        maxLength:150
    })
    @IsString()
    @MinLength(4,{
        message: 'Debe tener al menos 4 Caracteres'
    })
    @MaxLength(150,{
        message: 'Debe contener maximo 150 caracteres'
    })
    @IsNotEmpty()
    public readonly name : string;

    @ApiModelProperty({
        required: true,
        enum: ['Activo', 'Inactivo']
    })
    @IsNotEmpty()
    @IsEnum(state)
    public readonly state : state;


}