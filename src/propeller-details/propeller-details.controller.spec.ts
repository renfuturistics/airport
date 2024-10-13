import { Test, TestingModule } from '@nestjs/testing';
import { PropellerDetailsController } from './propeller-details.controller';

describe('PropellerDetailsController', () => {
  let controller: PropellerDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropellerDetailsController],
    }).compile();

    controller = module.get<PropellerDetailsController>(PropellerDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
