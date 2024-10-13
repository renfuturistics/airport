import { Test, TestingModule } from '@nestjs/testing';
import { PropellerDetailsService } from './propeller-details.service';

describe('PropellerDetailsService', () => {
  let service: PropellerDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropellerDetailsService],
    }).compile();

    service = module.get<PropellerDetailsService>(PropellerDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
