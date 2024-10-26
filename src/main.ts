import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Crypto Tracker API')
    .setDescription('APIs for tracking and alerts for crypto prices')
    .setVersion('1.0') // Add a version if necessary
    .build(); // Build the Swagger config

  const document = SwaggerModule.createDocument(app, config); // Create the Swagger document
  SwaggerModule.setup('api-docs', app, document); // Setup the Swagger UI at /api/docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
