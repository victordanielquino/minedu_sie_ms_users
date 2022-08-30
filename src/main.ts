import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // se llegan atributos que no estan definidos en el dtos, los ignora y continua
      forbidNonWhitelisted: true, // alerta de atributos que no esta definido en el esquema de los dtos
      transformOptions: { enableImplicitConversion: true }, // convierte string a number en @Query params
    }),
  );

  // INTERCEPTOR:
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('API USER V1')
    .setDescription('DOCUMENTS OF API BY VICTOR QUINO')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('API MICROSERVICES USER')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  app.setGlobalPrefix('api/v1');

  // habilitar acceso a todos CORS:
  app.enableCors();
  // FILTRO PARA CAPTURAR ERRORES
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
