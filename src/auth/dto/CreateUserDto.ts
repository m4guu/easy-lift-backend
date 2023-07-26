import { Role } from '../../common/enums';
import { IsEmail, MinLength, MaxLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(5)
  @MaxLength(15)
  password: string;

  @IsEnum(Role)
  role: Role;
}
