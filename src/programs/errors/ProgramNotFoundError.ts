import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from '../../libs/errors';

export class ProgramNotFoundError extends DomainError {
  constructor() {
    super(
      'Program not found.',
      HttpStatus.NOT_FOUND,
      ErrorId.PROGRAM_NOT_FOUND,
    );
  }
}
