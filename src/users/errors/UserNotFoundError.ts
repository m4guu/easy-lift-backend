import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from 'src/libs/errors';

export class UserNotFoundError extends DomainError {
  constructor() {
    super('User not found.', HttpStatus.NOT_FOUND, ErrorId.USER_NOT_FOUND);
  }
}
