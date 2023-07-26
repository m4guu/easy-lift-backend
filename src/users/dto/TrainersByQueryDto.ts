import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../../common/enums';

export class TrainersByQueryDto {
  @IsEnum(Role)
  role: Role;

  @IsNumberString()
  page: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsBooleanString()
  @IsOptional()
  personalTraining?: string;
}
