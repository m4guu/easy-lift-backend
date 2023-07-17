import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { User } from '../../common/entities';
import { Role } from '../../common/enums';
import { DomainError, ErrorId } from '../../libs/errors';
import { ConfiguredUserDto } from '../dto/ConfiguredUser.dto';

// MOCKS
export const ID_MOCK = '1234567890ab';
export const userMock = (): User => {
  return {
    id: new ObjectId(ID_MOCK),
    name: 'Mort',
    email: 'mock@email.com',
    password: 'passwordMock',
    role: Role.user,
    isConfigured: false,
    image: '',
  };
};
export const configureUserDtoMock = (): ConfiguredUserDto => {
  return {
    name: 'Name Mock',
    image: undefined as File,
    currentWeight: 90,
    height: 190,
  };
};
export class ErrorMock extends DomainError {
  constructor() {
    super('Error mock', HttpStatus.INTERNAL_SERVER_ERROR, ErrorId.ERROR_MOCK);
  }
}
