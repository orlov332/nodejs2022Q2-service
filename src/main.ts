import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { join } from 'path';

const PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = YAML.load(join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT).then(() => console.log('Server started at port🚀: ', PORT));
}

bootstrap();
