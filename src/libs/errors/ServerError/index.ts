import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from '..';

class ServerError extends DomainError {
  constructor() {
    super(
      'Something goes wrong. Please try later.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      ErrorId.INTERNAL_SERVER_ERROR,
    );
  }
}

export default ServerError;
