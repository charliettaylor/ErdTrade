import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import ERApiController from './erapi.controller';
import { ArmorsModule } from './armors/armors.module';

@Module({
  imports: [PrismaModule, UserModule, ArmorsModule],
  controllers: [AppController, ERApiController],
  providers: [AppService],
})
export class AppModule {}
