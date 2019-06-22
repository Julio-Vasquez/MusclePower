import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './../../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from './../user/user.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {}

    public async login(login: LoginDto):Promise<User> {
        return await this.repository
            .createQueryBuilder("user")
            .select("user.id","idUser")
            .addSelect("user.names", "namesUser")
            .addSelect("user.lastnames", "lastnamesUser")
            .addSelect("user.email", "emailUser")
            .addSelect("user.telephone", "telUser")
            .addSelect("user.role", "rolUser")
            .where("user.email = :email", { email: login.email })
            .andWhere("user.password = PASSWORD(:password)",{ password : login.password})
            .andWhere("user.state ='Activo'")
            .execute()
        ;
    }

    public async signUp(signUp: SignUpDto) {
        return;
    }

    public async validateUser(token:string): Promise<any>{
        let payload = this.jwtService.decode(token);
        if(payload)
            return await this.userService.validUser(payload);
        return false;
    }
}