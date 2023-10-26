import { Test, TestingModule } from '@nestjs/testing';
import { EngineDetailsController } from './engine-details.controller';

describe('EngineDetailsController', () => {
  let controller: EngineDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngineDetailsController],
    }).compile();

    controller = module.get<EngineDetailsController>(EngineDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
