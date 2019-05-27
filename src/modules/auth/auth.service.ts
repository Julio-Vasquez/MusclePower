import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';


import { LoginDto } from './dto/login.dto';
import { userService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly connection: Connection,
    private readonly userService: userService,
    ){
  }
}