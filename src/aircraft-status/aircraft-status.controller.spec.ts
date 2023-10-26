import { Test, TestingModule } from '@nestjs/testing';
import { AircraftStatusController } from './aircraft-status.controller';

describe('AircraftStatusController', () => {
  let controller: AircraftStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AircraftStatusController],
    }).compile();

    controller = module.get<AircraftStatusController>(AircraftStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
