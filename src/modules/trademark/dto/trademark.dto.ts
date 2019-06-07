import { IsNotEmpty, IsString, MinLength, MaxLength, Max } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

const min:string = 'Debe tener al menos ', 
      max : string ='Deber contener maximo ';

export class TrademarkDto
{
    @ApiModelProperty({
        required: true,
        type: String,
        minLength:4,
        maxLength:150
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4,{ message: min + '4 Caracteres' })
    @MaxLength(150,{ message: max + '150 Caracteres' })
    public readonly name : string;


    @ApiModelProperty({
        required: true,
        type: String,
        minLength:5
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(5,{
        message:  min +'5 caracteres,de los cuales uno es el punto, 3 la extencion de la imagen y los restantes el nombre de la imagen'
    })
    public readonly img : string;


}