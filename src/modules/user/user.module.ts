import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from './../../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtKey } from './../common/environment/environment';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'bearer' }),
        JwtModule.register({ 
            secret: JwtKey
        }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService,],
})

export class UserModule{}