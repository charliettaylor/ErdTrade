import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      tryItOutEnabled: true,
    },
    customSiteTitle: 'ErdTrade API',
  };

  const config = new DocumentBuilder()
    .setTitle('ErdTrade API')
    .setDescription('ErdTrade API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
