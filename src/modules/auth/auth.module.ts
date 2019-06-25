import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { User } from './../../entities/user.entity';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';

import { HttpStrategy } from '../common/strategy/http.strategy';
import { JwtKey } from './../common/environment/environment';
import { AuthMiddleware } from '../common/middleware/user.middleware';


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'bearer' }),
        JwtModule.register({ 
            secret: JwtKey
        }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService,HttpStrategy ],
    exports: []
})
export class AuthModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
        consumer
        .apply(AuthMiddleware)
        .forRoutes({path: 'auth/restorepassword', method: RequestMethod.GET})
    }
}