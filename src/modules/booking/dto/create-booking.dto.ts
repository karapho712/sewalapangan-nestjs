import { Type } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsMilitaryTime,
  IsEnum,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Court } from 'src/modules/court/entities/court.entity';
import { RentalEquipment } from 'src/modules/rental-equipment/entities/rental-equipment.entity';
import { Status } from 'src/types';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';

export class CreateBookingDto {
  @IsString()
  court: EntityRef<Court>;

  @IsString()
  occupant: string;

  @IsString()
  address: string;

  @IsString()
  handphoneNumber: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsMilitaryTime()
  startTime: Date;

  @IsMilitaryTime()
  endTime: Date;

  @IsEnum(Status)
  status: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EntityRef<RentalEquipment>)
  rentalEquipments: RentalEquipment[];
}
