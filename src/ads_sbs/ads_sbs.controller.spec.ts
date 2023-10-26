import { Test, TestingModule } from '@nestjs/testing';
import { AdsSbsController } from './ads_sbs.controller';

describe('AdsSbsController', () => {
  let controller: AdsSbsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdsSbsController],
    }).compile();

    controller = module.get<AdsSbsController>(AdsSbsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
