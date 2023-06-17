import { IsNumberString, IsString } from 'class-validator';

export class UserWorkoutsQueryDto {
  @IsString()
  creator: string;

  @IsNumberString()
  page: string;
}
