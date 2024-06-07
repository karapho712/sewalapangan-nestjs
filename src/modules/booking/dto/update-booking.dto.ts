import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsOptional } from 'class-validator';
import { Court } from 'src/modules/court/entities/court.entity';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @IsOptional()
  court: EntityRef<Court>;

  @IsOptional()
  occupant: string;

  @IsOptional()
  address: string;

  @IsOptional()
  handphoneNumber: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  startTime: Date;

  @IsOptional()
  endTime: Date;

  @IsOptional()
  status: string;
}
