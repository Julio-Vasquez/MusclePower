import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import { JWTKey } from './../../environment/environment';


class token
{
    public token(user){
        return {
            token: jwt.sign({
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,
                image: user.image,
                init: moment().unix(),
                exp: moment().add(10,'days').unix()
            },`${JWTKey}`)
        };
    }
}

export  default new token();