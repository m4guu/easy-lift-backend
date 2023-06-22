import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { ProgramLevels } from 'src/common/enums';

export class GetProgramsQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  creator?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumberString()
  @IsOptional()
  maxPrice?: number;

  @IsNumberString()
  @IsOptional()
  minPrice?: number;

  @IsNumberString()
  @IsOptional()
  minFreqTraining?: number;

  @IsNumberString()
  @IsOptional()
  maxFreqTraining?: number;

  @IsNumberString()
  @IsOptional()
  minProgramLength?: number;

  @IsNumberString()
  @IsOptional()
  maxProgramLength?: number;

  @IsString()
  @IsOptional()
  programLevel?: ProgramLevels;
}
