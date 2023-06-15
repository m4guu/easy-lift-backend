import { Min, Max, IsString, IsNumber } from 'class-validator';

export class UpdateWeightDto {
  @IsString()
  userId: string;

  @IsNumber()
  @Min(30)
  @Max(610)
  weight: number;
}
