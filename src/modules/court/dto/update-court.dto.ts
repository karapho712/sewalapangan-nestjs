import { PartialType } from '@nestjs/swagger';
import { CreateCourtDto } from './create-court.dto';
import { IsOptional } from 'class-validator';

export class UpdateCourtDto extends PartialType(CreateCourtDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;
}
