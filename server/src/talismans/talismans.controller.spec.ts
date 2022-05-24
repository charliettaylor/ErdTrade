import { Test, TestingModule } from '@nestjs/testing';
import { TalismansController } from './talismans.controller';
import { TalismansService } from './talismans.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TalismansController', () => {
  let controller: TalismansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalismansController],
      providers: [TalismansService, PrismaService],
    }).compile();

    controller = module.get<TalismansController>(TalismansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
