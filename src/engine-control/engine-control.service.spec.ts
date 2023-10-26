import { Test, TestingModule } from '@nestjs/testing';
import { EngineControlService } from './engine-control.service';

describe('EngineControlService', () => {
  let service: EngineControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineControlService],
    }).compile();

    service = module.get<EngineControlService>(EngineControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
