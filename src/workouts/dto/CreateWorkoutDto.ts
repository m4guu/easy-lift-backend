import {
  MinLength,
  MaxLength,
  IsString,
  IsBoolean,
  IsArray,
  ArrayMinSize,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { WorkoutExercise } from '../../common/interfaces';

export class CreateWorkoutDto {
  @IsString()
  creator: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  title: string;

  @IsDateString()
  date: string;

  @IsBoolean()
  isDraft: boolean;

  @IsArray()
  @ArrayMinSize(1)
  // ? question: how to properly validate array of objects ?
  //   @Type(() => WorkoutExercise)
  exercises: WorkoutExercise[];
}
