import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import ERApiController from './erapi.controller';
import { ArmorsModule } from './armors/armors.module';
import { AmmosModule } from './ammos/ammos.module';
import { AshesModule } from './ashes/ashes.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ArmorsModule,
    AmmosModule,
    AshesModule,
    HealthModule,
  ],
  controllers: [AppController, ERApiController],
  providers: [AppService],
})
export class AppModule {}
