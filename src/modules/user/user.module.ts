import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from './../../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
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
    controllers: [UserController],
    providers: [UserService,],
})

export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
        consumer
        .apply(AuthMiddleware)
        .forRoutes(UserController)
    }
}