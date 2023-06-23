import { IsOptional, IsString } from 'class-validator';

export class GetUserProgressQueryDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  exerciseId: string;
}
