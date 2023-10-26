import { Test, TestingModule } from '@nestjs/testing';
import { AdsSbsService } from './ads_sbs.service';

describe('AdsSbsService', () => {
  let service: AdsSbsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdsSbsService],
    }).compile();

    service = module.get<AdsSbsService>(AdsSbsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
