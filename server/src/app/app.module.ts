import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';
import ERApiController from '../erapi/erapi.controller';
import { EldenRingModule } from '../erapi/erapi.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          datasources: {
            db: {
              url: configService.get('DATABASE_URL'),
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    EldenRingModule,
    HealthModule,
    UserModule,
  ],
  controllers: [AppController, ERApiController],
  providers: [AppService, Logger],
  exports: [Logger],
})
export class AppModule {}
