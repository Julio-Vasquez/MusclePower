import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { CommonModule } from './modules/common/common.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    CommonModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (config) => (config.orm_config),
      inject: ['ConfigService']
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private readonly connection: Connection){ 
  }
}
