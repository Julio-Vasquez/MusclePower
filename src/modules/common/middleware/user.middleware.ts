import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly jwt: JwtService) { }
    async resolve() {
        
        return async (req: any, res, next:Function) => {
            if (req.headers && req.headers.authorization.split(' ')[0] === 'Bearer') {
                const token: any = this.jwt.verify(req.headers.authorization.split(' ')[1]);
                if (token &&  token.end > Math.round(new Date().getTime() /1000)) {  
                    return next();
                } else {
                    return res.status(HttpStatus.UNAUTHORIZED).json({ state: 'Error', data: 'token expirado' });
                }
            }
            return res.status(HttpStatus.UNAUTHORIZED).json({ data: 'Usted debe proveer un toquen de autenticación valido' })
        };
    }
}