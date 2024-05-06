import { PartialType } from '@nestjs/swagger';
import { CreateRentalEquipmentDto } from './create-rental-equipment.dto';
import { IsOptional } from 'class-validator';

export class UpdateRentalEquipmentDto extends PartialType(
  CreateRentalEquipmentDto,
) {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;
}
