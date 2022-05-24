import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TalismansController } from './talismans.controller';
import { TalismansService } from './talismans.service';

@Module({
  imports: [PrismaModule],
  controllers: [TalismansController],
  providers: [TalismansService],
})
export class TalismansModule {}
