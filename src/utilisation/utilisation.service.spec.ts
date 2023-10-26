import { Test, TestingModule } from '@nestjs/testing';
import { UtilisationService } from './utilisation.service';

describe('UtilisationService', () => {
  let service: UtilisationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilisationService],
    }).compile();

    service = module.get<UtilisationService>(UtilisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
