import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateRentalEquipmentDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
