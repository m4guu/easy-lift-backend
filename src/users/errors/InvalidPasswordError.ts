import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from 'src/libs/errors';

export class InvalidPasswordError extends DomainError {
  constructor() {
    super(
      'Invalid password provided.',
      HttpStatus.UNAUTHORIZED,
      ErrorId.INVALID_PASSWORD,
    );
  }
}
