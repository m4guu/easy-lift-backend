import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetWorkoutsQueryDto {
  @IsNumberString()
  page: string;

  @IsString()
  @IsOptional()
  creator?: string;

  @IsOptional()
  @IsNumberString()
  monthNumber?: string;
}
