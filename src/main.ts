import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import dataSource from './data-source/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  dataSource
    .initialize()
    .then(() => {})
    .catch((error) => console.log(error));
  await app.listen(8000);
}
bootstrap();
