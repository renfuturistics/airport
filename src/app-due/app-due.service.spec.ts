import { Test, TestingModule } from '@nestjs/testing';
import { AppDueService } from './app-due.service';

describe('AppDueService', () => {
  let service: AppDueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppDueService],
    }).compile();

    service = module.get<AppDueService>(AppDueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
