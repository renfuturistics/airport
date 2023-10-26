import { Test, TestingModule } from '@nestjs/testing';
import { UtilisationController } from './utilisation.controller';

describe('UtilisationController', () => {
  let controller: UtilisationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilisationController],
    }).compile();

    controller = module.get<UtilisationController>(UtilisationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
