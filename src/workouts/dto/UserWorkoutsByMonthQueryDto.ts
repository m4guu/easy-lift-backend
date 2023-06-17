import { IsNumberString, IsString } from 'class-validator';

export class UserWorkoutsByMonthQueryDto {
  @IsString()
  userId: string;

  @IsNumberString()
  monthNumber: string;
}
