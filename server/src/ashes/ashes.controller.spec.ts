import { Test, TestingModule } from '@nestjs/testing';
import { AshesController } from './ashes.controller';
import { AshesService } from './ashes.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AshesController', () => {
  let controller: AshesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AshesController],
      providers: [AshesService, PrismaService],
    }).compile();

    controller = module.get<AshesController>(AshesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
