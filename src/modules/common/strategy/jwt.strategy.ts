import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { JwtKey } from '../environment/environment';
import * as passport from 'passport';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly userService: UserService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretKey: JwtKey
            }
        )
        passport.use(this);
    }

    public async validate(token: string): Promise<any> {
        let user = await this.userService.validUser(token);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}