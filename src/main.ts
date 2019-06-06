import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';
import { mode, appName, appHost, appPrefix, appPort, node_env } from './modules/common/environment/environment';
import { NestEnvironment } from '@nestjs/common/enums/nest-environment.enum';

async function bootstrap() {
  Logger.setMode((node_env)? NestEnvironment.RUN : NestEnvironment.TEST);
  const logger = new Logger('HttpsServer');
  const app = await NestFactory.create(AppModule,{ cors: true});
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(appPrefix);

  const credentials = new DocumentBuilder()
  .setTitle('Muscle Power')
  .setDescription('the best supplements for athletes and u')
  .setVersion('0.1')
  .setLicense('MIT','https://www.mit.edu/~amini/LICENSE.md')
  .setHost(`${appHost}:${appPort}`)
  .setContactEmail('jualvalitube@gmail.com')
  .setContactEmail('jeisoncuestas@email.com')
  .addTag('Supplements')
  .addTag('Fitness')
  .addTag('Muscle')
  .addTag('Power')
  .addTag('The best')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, credentials);
  SwaggerModule.setup('Muscle Power', app, document);
  await app.listen(appPort,()=>{
    logger.log( (mode)?
      `${appName} => Server running on ${appHost}:${appPort}/${appPrefix}/`: 
      `${appName} => Modo Development => ${appHost}:${appPort}/${appPrefix}/`
    );
  });     
  
}
bootstrap();
