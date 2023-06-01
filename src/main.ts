import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { Environment } from './config/env/env.config';
import { CORS_config } from './config/CORS.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CORS_config);
  app.use(cookieParser()); // cookie parser middleware
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get(Environment.PORT);

  await app.listen(port);
}
bootstrap();
