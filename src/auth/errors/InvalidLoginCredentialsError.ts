import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from '../../libs/errors';

export class InvalidLoginCredentialsError extends DomainError {
  constructor() {
    super(
      'Invalid login credentials.',
      HttpStatus.UNAUTHORIZED,
      ErrorId.INVALID_LOGIN_CREDENTIALS,
    );
  }
}
