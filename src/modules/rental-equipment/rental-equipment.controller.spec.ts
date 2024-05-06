import { Test, TestingModule } from '@nestjs/testing';
import { RentalEquipmentController } from './rental-equipment.controller';
import { RentalEquipmentService } from './rental-equipment.service';

describe('RentalEquipmentController', () => {
  let controller: RentalEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalEquipmentController],
      providers: [RentalEquipmentService],
    }).compile();

    controller = module.get<RentalEquipmentController>(RentalEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
