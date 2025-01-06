import { Test, TestingModule } from '@nestjs/testing';
import { FutsalController } from './futsal.controller';
import { FutsalService } from './futsal.service';

describe('FutsalController', () => {
  let controller: FutsalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FutsalController],
      providers: [FutsalService],
    }).compile();

    controller = module.get<FutsalController>(FutsalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
