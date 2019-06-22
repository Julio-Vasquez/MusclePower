import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './../auth.service';
import { LoginDto } from './../dto/login.dto';
import { JwtKey } from './../../common/environment/environment';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy)
{
    constructor(
        private readonly authService: AuthService
    ) {
        super(
            {
                usernameField: 'email',
                passReqToCallback: false
            },
        );
    }

    public async validate(email:string, password:string, done:Function): Promise<any> {
        const loginDto = {
            email: email,
            password: password
        };
        const user = await this.authService.login(loginDto);
        if (!user) {
           return done(new UnauthorizedException(), false);
        }
       done(null, user);
    }
}