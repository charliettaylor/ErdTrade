import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { EncryptionService } from './encryption.service';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [PrismaModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, EncryptionService, SessionSerializer],
  controllers: [AuthController],
  exports: [EncryptionService],
})
export class AuthModule {}
