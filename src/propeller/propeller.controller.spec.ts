import { Test, TestingModule } from '@nestjs/testing';
import { PropellerController } from './propeller.controller';

describe('PropellerController', () => {
  let controller: PropellerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropellerController],
    }).compile();

    controller = module.get<PropellerController>(PropellerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
