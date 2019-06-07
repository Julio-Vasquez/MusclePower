import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { LoginDto } from './dto/login.dto';
import { UserService } from './../user/user.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly connection: Connection,
    private readonly userService: UserService,
    ){
  }

  public async login(login: LoginDto)
  {
    return;
  }

  public async signUp(signUp: SignUpDto)
  {
    return;
  }
}