import { Test, TestingModule } from '@nestjs/testing';
import { FutsalService } from './futsal.service';

describe('FutsalService', () => {
  let service: FutsalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FutsalService],
    }).compile();

    service = module.get<FutsalService>(FutsalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
