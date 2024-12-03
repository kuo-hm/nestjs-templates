import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { TrimPipe } from './common/pipes';
async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(new TrimPipe());

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('project_name')
    .setDescription('project_name Description')
    .setVersion('0.1')
    .setExternalDoc('Postman Collection', '/api-json')
    .addTag('TEMPLATE')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'Autorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(compression());

  const configService = app.get(ConfigService);

  const corsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    origin: '*',
  };
  app.enableCors(corsOptions);
  const PORT = configService.get('PORT') || 3000;
  await app.listen(PORT, '0.0.0.0');
  logger.log('Application is running on port ' + PORT);
  logger.log(`for swagger api, please visit http://localhost:${PORT}/api`);
}
bootstrap();
