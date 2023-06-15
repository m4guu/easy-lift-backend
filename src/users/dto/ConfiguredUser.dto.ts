import {
  MinLength,
  MaxLength,
  IsString,
  IsNumberString,
} from 'class-validator';

export class ConfiguredUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  name: string;

  image: File;

  @IsNumberString()
  currentWeight: number;

  @IsNumberString()
  height: number;
}
