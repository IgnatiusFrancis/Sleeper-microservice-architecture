import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from "cookie-parser";


async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser())
  app.connectMicroservice({transport: Transport.TCP})

  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
   app.useLogger(app.get(Logger))
  const configService = app.get(ConfigService)

  await app.startAllMicroservices()
  await app.listen(configService.get('PORT'));  
}
bootstrap();
