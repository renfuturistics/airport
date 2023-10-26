import { Test, TestingModule } from '@nestjs/testing';
import { AircraftStatusService } from './aircraft-status.service';

describe('AircraftStatusService', () => {
  let service: AircraftStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AircraftStatusService],
    }).compile();

    service = module.get<AircraftStatusService>(AircraftStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
