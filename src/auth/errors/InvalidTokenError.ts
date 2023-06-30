import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from 'src/libs/errors';

export class InvalidTokenError extends DomainError {
  constructor() {
    super(
      'The provided token is invalid or expired. Please ensure that you have a valid and up-to-date token and try again. If the problem persists, please contact support for further assistance.',
      HttpStatus.FORBIDDEN,
      ErrorId.INVALID_TOKEN,
    );
  }
}
