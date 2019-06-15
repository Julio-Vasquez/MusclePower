import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
//import { userService } from '../user/user.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy)
{
    constructor(/*private readonly userService: userService*/) {
        super();
    }

    public async valid(token: string): Promise<any> {
        const userValid: boolean = true;//await this.userService.validatetokenUser(token);
        if (!userValid) {
            throw new UnauthorizedException();
        }
        return userValid;
    }
}