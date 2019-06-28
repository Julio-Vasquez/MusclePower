import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';
export class BuyDto{
  @ApiModelProperty({
    required: true,
    type: Number,
    minimum: 1
  })

  @IsNotEmpty()
  public readonly cant: number;

 @ApiModelProperty({
    required: true,
    type: Number,
    minimum: 1
  })
  
  @IsNotEmpty()
  public readonly id: number;
}