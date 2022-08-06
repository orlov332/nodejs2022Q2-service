import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

const { PORT = 4000 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(LoggerService));

  const document = YAML.load(join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT).then(() => Logger.log(`Server 🚀 started at port: ${PORT}`));
}

bootstrap();
