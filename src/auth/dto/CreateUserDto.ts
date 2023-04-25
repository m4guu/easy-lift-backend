import { Role } from 'src/common/enums';

export interface CreateUserDto {
  email: string;
  password: string;
  role: Role;
}
