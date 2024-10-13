import { Test, TestingModule } from '@nestjs/testing';
import { PropellerControlController } from './propeller-control.controller';

describe('PropellerControlController', () => {
  let controller: PropellerControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropellerControlController],
    }).compile();

    controller = module.get<PropellerControlController>(PropellerControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
