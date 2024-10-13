import { Test, TestingModule } from '@nestjs/testing';
import { PropellerControlService } from './propeller-control.service';

describe('PropellerControlService', () => {
  let service: PropellerControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropellerControlService],
    }).compile();

    service = module.get<PropellerControlService>(PropellerControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
