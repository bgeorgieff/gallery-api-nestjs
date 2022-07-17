import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      preflightContinue: false,
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Gallery API')
    .setDescription('Gallery api for the project Gallery App.')
    .setVersion('1.0')
    .addTag('Endpoints')
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT || 9999);
}
bootstrap();
