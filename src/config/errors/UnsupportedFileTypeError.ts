import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from '../../libs/errors';

export class UnsupportedFileTypeError extends DomainError {
  constructor() {
    super(
      'Unsupported file type.',
      HttpStatus.BAD_REQUEST,
      ErrorId.UNSUPPORTED_FILE_TYPE,
    );
  }
}
