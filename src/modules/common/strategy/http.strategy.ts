import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';

import { AuthService } from './../../auth/auth.service';
import response from '../response/response';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly authService: AuthService) {
        super();
    }

    public async validate(token: string) {
        const user = await this.authService.validateUser(token);
        if (!user)
            return response
                .status({statusCode: HttpStatus.UNAUTHORIZED, state: 'UNAUTHORIZED'})
                .message('Token invalido')
                .json()
            ;
        return user;
    }
}