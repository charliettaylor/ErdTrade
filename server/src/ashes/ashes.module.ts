import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AshesController } from './ashes.controller';
import { AshesService } from './ashes.service';

@Module({
  imports: [PrismaModule],
  controllers: [AshesController],
  providers: [AshesService],
})
export class AshesModule {}
