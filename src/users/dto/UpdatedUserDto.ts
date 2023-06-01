import {
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsString,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Role } from 'src/common/enums';
import { BodyWeight } from 'src/common/interfaces';

export class UpdatedUserDto {
  @IsString()
  id: string;

  @IsString()
  @MinLength(4)
  @MaxLength(15)
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;

  @IsBoolean()
  isConfigured: boolean;

  @IsOptional()
  @IsString()
  image: string; // DUMMY DATA

  @IsString()
  expirationDate: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(100)
  description?: string;

  @IsOptional()
  @IsArray()
  gyms?: string[];

  @IsOptional()
  @IsArray()
  bodyWeights?: BodyWeight[];

  @IsOptional()
  @IsNumber()
  height?: number;
}
