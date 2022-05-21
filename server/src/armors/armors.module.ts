import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArmorsController } from './armors.controller';
import { ArmorsService } from './armors.service';

@Module({
  imports: [PrismaModule],
  controllers: [ArmorsController],
  providers: [ArmorsService],
})
export class ArmorsModule {}
