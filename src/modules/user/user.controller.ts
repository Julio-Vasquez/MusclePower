import { Controller, Post, Body, HttpStatus, Put, Param, Get, Delete } from '@nestjs/common';
import Response from '../common/response';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { userService } from './user.service';

@ApiBearerAuth()
@ApiUseTags('Usuario')
@Controller('user')
export class userController {
  constructor(private readonly users: userService) {}

  @ApiOperation({ title: 'Listado de usuarios' })
  @ApiResponse({
      status: 200,
      description: 'devuelve el listado de usuarios existentes.',
  })
  @Get('ListUsers/')
  public async ListArtist()
  {  
     let res =await  this.users.ListUsers();
      return Response
      .status({status: HttpStatus.OK, state:'OK'})
      .message('Operacion Completa')
      .json(res);
  }
}