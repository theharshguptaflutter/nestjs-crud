import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: false, cors: true });

  app.use(json({ limit: '5000000000000mb' }));

  // Set global prefix for API routes
  app.setGlobalPrefix('api');

  // Enable versioning via URI
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
