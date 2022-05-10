import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './app.service';
import ERApiController from './api/eldenRingApi/eldenRingApi.controller';
import { UserController } from './api/user/user.controller';
import { UserService } from './api/user/user.service';
import { PrismaService } from 'api/prisma.service';
import { ArmorsController } from 'api/armors/armors.controller';
import { ArmorsService } from 'api/armors/armors.service';

@Module({
  imports: [],
  controllers: [AppController, ERApiController, UserController, ArmorsController],
  providers: [AppService, UserService, PrismaService, ArmorsService],
})
export class AppModule {}
