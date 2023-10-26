import { Test, TestingModule } from '@nestjs/testing';
import { EngineDetailsService } from './engine-details.service';

describe('EngineDetailsService', () => {
  let service: EngineDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineDetailsService],
    }).compile();

    service = module.get<EngineDetailsService>(EngineDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
