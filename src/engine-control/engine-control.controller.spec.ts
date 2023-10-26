import { Test, TestingModule } from '@nestjs/testing';
import { EngineControlController } from './engine-control.controller';

describe('EngineControlController', () => {
  let controller: EngineControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngineControlController],
    }).compile();

    controller = module.get<EngineControlController>(EngineControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
