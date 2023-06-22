import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetProgramsQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  creator?: string;
}
