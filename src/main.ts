import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get<string>('ROOT_API'))
  app.useGlobalPipes(new ValidationPipe({whitelist: true, }));

  app.enableCors({origin:true});

  const config = new DocumentBuilder()
    .setTitle('BLOG')
    .setDescription('APIs for blog management')
    .setVersion('1.0')
    .addServer(configService.get<string>('HOST'))
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'Authorization',
    )
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(configService.get<string>('ROOT_API')+'/docs',app,document);
    await app.listen(configService.get<number>('PORT'))
}
bootstrap();
