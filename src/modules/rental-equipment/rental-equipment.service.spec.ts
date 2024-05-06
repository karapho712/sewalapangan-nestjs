import { Test, TestingModule } from '@nestjs/testing';
import { RentalEquipmentService } from './rental-equipment.service';

describe('RentalEquipmentService', () => {
  let service: RentalEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalEquipmentService],
    }).compile();

    service = module.get<RentalEquipmentService>(RentalEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
