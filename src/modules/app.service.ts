import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(
        @Inject('ConfigService') private readonly config
    ) {}
    root(): string {
        return `Bienvenido a <h1 style='Color: RED'>${this.config.AppName}</h1>`;
    }
}
