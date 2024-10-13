import { Test, TestingModule } from '@nestjs/testing';
import { PropellerService } from './propeller.service';

describe('PropellerService', () => {
  let service: PropellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropellerService],
    }).compile();

    service = module.get<PropellerService>(PropellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
