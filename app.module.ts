import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './app.service';
import ERApiController from './api/eldenRingApi/eldenRingApi.controller';
import { UserController } from './api/user/user.controller';
import { UserService } from './api/user/user.service';

@Module({
  imports: [],
  controllers: [AppController, ERApiController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
