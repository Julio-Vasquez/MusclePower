import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


import { UserDto } from './dto/user.dto';

import { User } from 'src/entities/user.entity';


@Injectable()
export class UserService
{
    constructor(
        @InjectRepository(User)
        private readonly repositoryUser: Repository<User>
    ){}

    public async ListUsers()
    {
        return this.repositoryUser.find();
    }

    public async Create(User: UserDto): Promise<User>
    {
        return ;
    }
}