import { Test, TestingModule } from '@nestjs/testing';
import { AmmosController } from './ammos.controller';
import { AmmosService } from './ammos.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AmmosController', () => {
  let controller: AmmosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmmosController],
      providers: [AmmosService, PrismaService],
    }).compile();

    controller = module.get<AmmosController>(AmmosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
