import { Injectable, Inject } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { userInterface } from './interface/user.interface';

@Injectable()
export class userService
{
    constructor(){}

    public async ListUsers()
    {
        return ;
    }

    public async Create(User: UserDto): Promise<userInterface>
    {
        return ;
    }
}