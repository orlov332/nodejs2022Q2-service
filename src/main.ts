import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

const { PORT = 4000 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const document = YAML.load(join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT).then(() => console.log('Server 🚀 started at port: ', PORT));
}

bootstrap();
