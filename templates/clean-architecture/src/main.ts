import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(cookieParser());
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const frontendUrl = configService.get('FRONTEND_URL') || 'http://localhost:3000';

  const corsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    origin: frontendUrl,
  };
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('project_name')
    .setDescription('project_name API Description')
    .setVersion('1.0')
    .setExternalDoc('Postman Collection', '/api-json')
    .addTag('API')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableShutdownHooks();

  const PORT = configService.get('PORT') || 3000;
  await app.listen(PORT, '0.0.0.0');
  logger.log(`Application is running on port ${PORT}`);
  logger.log(`Swagger API documentation: http://localhost:${PORT}/api`);
}

bootstrap();

