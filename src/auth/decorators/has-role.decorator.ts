import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/enums';

export const HasRole = (role: Role) => SetMetadata('role', role);
