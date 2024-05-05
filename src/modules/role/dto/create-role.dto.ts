import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntityRef<Permission>)
  permissions: EntityRef<Permission>[];
}
