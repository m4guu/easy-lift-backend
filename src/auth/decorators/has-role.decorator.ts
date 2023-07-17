import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums';

export const HasRole = (role: Role) => SetMetadata('role', role);
