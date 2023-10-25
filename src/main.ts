import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../../', 'uploads'), {
    prefix: '/public',
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(
          errors.map((error) => ({
            [error.property]: Object.values(error.constraints),
          })),
        );
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('E-com Demo')
    .setDescription('The E-com Demo API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('addresses')
    .addTag('categories')
    .addTag('products')
    .addTag('images')
    .addTag('carts')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(9000);
}
bootstrap();
