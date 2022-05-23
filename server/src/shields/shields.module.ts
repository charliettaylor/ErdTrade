import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShieldsController } from './shields.controller';
import { ShieldsService } from './shields.service';

@Module({
  imports: [PrismaModule],
  controllers: [ShieldsController],
  providers: [ShieldsService],
})
export class ShieldsModule {}
