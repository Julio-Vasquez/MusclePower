import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTKey } from './../common/environment/environment';
import { AuthController } from './auth.controller';
import { HttpStrategy } from '../common/http.strategy';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({
            privateKey: JWTKey
        })
    ],
    controllers: [AuthController],
    providers: [HttpStrategy, AuthService],
    exports: []
})
export class AuthModule {}