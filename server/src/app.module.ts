import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import ERApiController from './erapi.controller';
import { EldenRingModule } from './eldenring.module';

@Module({
  imports: [
    AuthModule,
    EldenRingModule,
    HealthModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController, ERApiController],
  providers: [AppService],
})
export class AppModule {}
