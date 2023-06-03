import { MinLength, MaxLength, IsString } from 'class-validator';

export class ConfiguredTrainerDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  name: string;

  image: File;

  @IsString()
  @MinLength(20)
  @MaxLength(100)
  description: string;

  @IsString()
  gyms: string;
}
