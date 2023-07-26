import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from '../../libs/errors';

export class UserProgressNotFoundError extends DomainError {
  constructor() {
    super(
      'User progress not found.',
      HttpStatus.NOT_FOUND,
      ErrorId.USER_PROGRESS_NOT_FOUND,
    );
  }
}
