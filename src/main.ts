import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const api = await NestFactory.create(AppModule);
  api.setGlobalPrefix('api');
  const configService = api.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription('The Booking API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(api, config);
  SwaggerModule.setup('swagger', api, document);

  await api.listen(configService.get('port'));
}
bootstrap();
