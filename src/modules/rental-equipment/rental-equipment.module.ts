import { Module } from '@nestjs/common';
import { RentalEquipmentService } from './rental-equipment.service';
import { RentalEquipmentController } from './rental-equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalEquipment } from './entities/rental-equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentalEquipment])],
  controllers: [RentalEquipmentController],
  providers: [RentalEquipmentService],
})
export class RentalEquipmentModule {}
