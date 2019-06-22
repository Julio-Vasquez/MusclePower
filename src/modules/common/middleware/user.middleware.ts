import { Injectable, NestMiddleware } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { JwtKey } from '../environment/environment';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor() {}
    resolve() {
        return (req, res, next) => {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                let token = req.headers.authorization.split(' ')[1]
                jwt.verify(token, JwtKey, function(err, payload) {
                    if (!err) {
                        req.correo = payload.correo;
                        next();
                    } else {
                        return res.status(403).json(err);
                    }
                })
            } 
                return res.status(401).json('Usted debe proveer un token de autenticación válido.');
        }
    }
}