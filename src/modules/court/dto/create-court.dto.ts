import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateCourtDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
