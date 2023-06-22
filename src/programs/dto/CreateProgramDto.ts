import {
  MinLength,
  MaxLength,
  IsString,
  IsNumberString,
} from 'class-validator';

export class CreateProgramDto {
  @IsString()
  creator: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  title: string;

  @IsString()
  level: string;

  @IsNumberString()
  frequencyPerWeek: string;

  @IsNumberString()
  programLength: string;

  @IsString()
  program: string;

  image: File;

  @IsNumberString()
  price: string;

  @IsString()
  @MinLength(20)
  @MaxLength(150)
  description: string;
}
