import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import * as expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import * as CONSTANTS from './common/constants';
import * as passport from 'passport';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.use(helmet());

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
  SwaggerModule.setup('docs', app, document, customOptions);

  app.use(
    expressSession({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      },
      secret: CONSTANTS.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(prismaService, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(csurf());

  await app.listen(3000);
}
bootstrap();
