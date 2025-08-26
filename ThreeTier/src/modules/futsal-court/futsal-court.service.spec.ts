import { Test, TestingModule } from '@nestjs/testing';
import { FutsalCourtService } from './futsal-court.service';

describe('FutsalCourtService', () => {
  let service: FutsalCourtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FutsalCourtService],
    }).compile();

    service = module.get<FutsalCourtService>(FutsalCourtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
