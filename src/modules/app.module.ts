import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CommonModule } from './common/common.module';
import { CategoryModule } from './category/category.module';
import { TrademarkModule } from './trademark/trademark.module';

@Module({
    imports: [
        ProductModule,
        CategoryModule,
        CommonModule,
        TrademarkModule,
        TypeOrmModule.forRootAsync({
            useFactory: async (config) => (config.orm_config),
            inject: ['ConfigService']
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
    constructor(private readonly connection: Connection) {}
}