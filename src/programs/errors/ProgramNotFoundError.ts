import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from 'src/libs/errors';

export class ProgramNotFoundError extends DomainError {
  constructor() {
    super(
      'Program not found.',
      HttpStatus.NOT_FOUND,
      ErrorId.PROGRAM_NOT_FOUND,
    );
  }
}
