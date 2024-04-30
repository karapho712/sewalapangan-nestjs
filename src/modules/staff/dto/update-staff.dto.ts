import { PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from './create-staff.dto';
import { IsOptional } from 'class-validator';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password: string;
}
