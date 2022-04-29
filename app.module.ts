import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './app.service';
import ERApiController from './api/eldenRingApi.controller';

@Module({
  imports: [],
  controllers: [AppController, ERApiController],
  providers: [AppService],
})
export class AppModule {}
