import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ProductDto {

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
   public readonly name: string;

   @ApiModelProperty({
      required: true,
      type: String,
      minLength: 4
   })
   @IsString()
   @MinLength(4, {
      message: "El Apellido debe contener al menos 4 caracteres"
   })
   @IsNotEmpty()
   public readonly description: string;

   @ApiModelProperty({
      required: true,
      type: Number,
      minimum: 1000
   })
   
   public readonly price: number;

   @ApiModelProperty({
      required: true,
      type: Number,
      minimum: 1
   })
   
   public readonly cant: number;

   @ApiModelProperty({
      required: true,
      type: String
   })
   @IsString()
   @MinLength(10, {
      message: "La informacion adicional debe contener al menos 10 caracteres"
   })
   @IsNotEmpty()
   public readonly adictionalInformation: string;

   @ApiModelProperty({
      required: true,
      type: Number
   })
  
   public readonly fk_trademark: number;

   @ApiModelProperty({
      required: true,
      type: Number
   })
  
   public readonly fk_category: number;
}