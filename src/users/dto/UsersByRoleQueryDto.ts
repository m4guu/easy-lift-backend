import { IsEnum, IsNumberString, IsString } from 'class-validator';
import { Role } from 'src/common/enums';

export class UsersByRoleQueryDto {
  @IsEnum(Role)
  role: Role;

  @IsNumberString()
  page: string;
}
