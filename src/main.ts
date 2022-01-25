import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getLogLevels from './utils/functions/get-log-levels';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: getLogLevels(process.env.NODE_ENV === 'production'),
  });
  /** API versioning configurations */
  app.enableVersioning({ type: VersioningType.URI });
  /** Configuration implementations */
  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
