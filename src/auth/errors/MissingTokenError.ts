import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from '../../libs/errors';

export class MissingTokenError extends DomainError {
  constructor() {
    super(
      'The request requires authentication, and a valid token is missing. Please ensure that you include a valid token in the request headers or provide the necessary credentials for authentication.',
      HttpStatus.UNAUTHORIZED,
      ErrorId.MISSING_TOKEN,
    );
  }
}
