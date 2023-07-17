import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { User } from '../../common/entities';
import { Role } from '../../common/enums';
import { DomainError, ErrorId } from '../../libs/errors';

// MOCKS
export const userMock = (): User => {
  return {
    id: new ObjectId('1234567890ab'),
    name: 'Mort',
    email: 'mock@email.com',
    password: 'passwordMock',
    role: Role.user,
    isConfigured: false,
    image: '',
  };
};
export class ErrorMock extends DomainError {
  constructor() {
    super('Error mock', HttpStatus.INTERNAL_SERVER_ERROR, ErrorId.ERROR_MOCK);
  }
}
