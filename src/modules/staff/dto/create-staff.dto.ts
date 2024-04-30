import { IsString, MinLength } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
