import { Test, TestingModule } from '@nestjs/testing';
import ERApiController from './erapi.controller';

describe('ERApiController', () => {
  let controller: ERApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ERApiController],
    }).compile();

    controller = module.get<ERApiController>(ERApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
