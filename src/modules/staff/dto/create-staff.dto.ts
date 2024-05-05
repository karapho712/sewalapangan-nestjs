import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Role } from 'src/modules/role/entities/role.entity';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';

export class CreateStaffDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntityRef<Role>)
  roles: Role[];
}
