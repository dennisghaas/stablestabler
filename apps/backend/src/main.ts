import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config/config';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(Config);

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: !config.isProduction(),
      forbidNonWhitelisted: true,
    }),
  );

  const cors = config.getCorsDetails();
  app.enableCors({
    origin: cors?.origin,
    methods: cors?.methods,
    credentials: cors?.credentials,
  });

  if (!config.isProduction()) {
    const project = config.getSwaggerSetup();
    const docs = new DocumentBuilder()
      .setTitle(project.name)
      .setDescription(project.description)
      .setVersion(project.version)
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, docs);
    SwaggerModule.setup(project.path, app, documentFactory);
  }

  await app.listen(config.getPort(), '0.0.0.0');
}
bootstrap();
