import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Cargar variables de entorno desde el archivo .env
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Adoptions API')
    .setDescription('API for managing adoptions, pets, and users')
    .setVersion('1.0')
    .addBearerAuth() // Agregar soporte para autenticación JWT en Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Activar la validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza errores para propiedades desconocidas
      transform: true, // Convierte los datos al tipo esperado en el DTO
    }),
  );

  // Habilitar CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*', // Permitir origen definido en el .env o todos los orígenes
    credentials: true, // Permitir envío de cookies o credenciales
  });

    // Aplicar filtro de errores global
    app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`App running on port ${port}`);
}
bootstrap();

