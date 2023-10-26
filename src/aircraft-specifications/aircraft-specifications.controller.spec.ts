import { Test, TestingModule } from '@nestjs/testing';
import { AircraftSpecificationsController } from './aircraft-specifications.controller';

describe('AircraftSpecificationsController', () => {
  let controller: AircraftSpecificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AircraftSpecificationsController],
    }).compile();

    controller = module.get<AircraftSpecificationsController>(AircraftSpecificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
