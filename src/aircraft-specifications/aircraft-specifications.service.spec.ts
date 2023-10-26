import { Test, TestingModule } from '@nestjs/testing';
import { AircraftSpecificationsService } from './aircraft-specifications.service';

describe('AircraftSpecificationsService', () => {
  let service: AircraftSpecificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AircraftSpecificationsService],
    }).compile();

    service = module.get<AircraftSpecificationsService>(AircraftSpecificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
