import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';

import { User } from './../../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {}

    public async login(login: LoginDto, expiration:number):Promise<any> {
        const res = await this.repository
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
        const ini = parseInt(moment().format('YYYYMMDDhmm'));
        const accessToken = {
            id: res[0].idUser,
            names: res[0].namesUser,
            lastnames: res[0].lastnamesUser,
            email: res[0].emailUser,
            tel: res[0].telUser,
            role: res[0].rolUser,
            state: 'valid',
            start: ini,
            end: ini+expiration
        }
        console.log(accessToken)
        return accessToken;
    }

    public async signUp(signUp: SignUpDto) : Promise<boolean>{
        const exist: User = await this.repository.findOne({ email: signUp.email, state: 'Activo'});
        console.log(!exist)
        if(!exist){
            await this.repository.createQueryBuilder()
            .insert()
            .into(User)
            .values({
                names: signUp.names,
                lastnames: signUp.lastnames,
                email: signUp.email,
                password: () => `PASSWORD('${signUp.password}')`,
                telephone: signUp.telephone,
                role: 'User',
                state: 'Activo'
            })
            .execute();
            return true;
        }
        return false;
    }

    public async validateUser(token): Promise<any>{
        const payload:any = this.jwtService.decode(token);
        if( payload )
            return await this.userService.validUser(payload);
        return false;
    }
}