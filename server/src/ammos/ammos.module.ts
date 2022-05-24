import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AmmosController } from './ammos.controller';
import { AmmosService } from './ammos.service';

@Module({
  imports: [PrismaModule],
  controllers: [AmmosController],
  providers: [AmmosService],
})
export class AmmosModule {}
