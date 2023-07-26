import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from '../../libs/errors';

export class AssignedEmailError extends DomainError {
  constructor() {
    super(
      'Email already exists.',
      HttpStatus.CONFLICT,
      ErrorId.EMAIL_ALREADY_ASSIGNED,
    );
  }
}
