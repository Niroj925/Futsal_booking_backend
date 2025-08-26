import { Test, TestingModule } from '@nestjs/testing';
import { FutsalCourtController } from './futsal-court.controller';
import { FutsalCourtService } from './futsal-court.service';

describe('FutsalCourtController', () => {
  let controller: FutsalCourtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FutsalCourtController],
      providers: [FutsalCourtService],
    }).compile();

    controller = module.get<FutsalCourtController>(FutsalCourtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
