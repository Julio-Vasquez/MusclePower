import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtKey } from './../common/environment/environment';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../common/strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { User } from './../../entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';


@Module({
    imports: [
        PassportModule.register({
            defaultStrategy:'jwt'
        }),
        JwtModule.register({
            secretOrPrivateKey: JwtKey,
            signOptions:{
                expiresIn: 3600
            }
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, JwtStrategy, LocalStrategy ],
    exports: []
})
export class AuthModule {}