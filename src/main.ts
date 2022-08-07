import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

const { PORT = 4000 } = process.env;

process.on('uncaughtException', (err, origin) => {
  Logger.error(`Caught exception: ${err}, Exception origin: ${origin}`, err.stack, 'UncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  Logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`, 'UnhandledRejection');
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(LoggerService));
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  const document = YAML.load(join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT).then(() => Logger.log(`Server 🚀 started at port: ${PORT}`));
}

bootstrap();
