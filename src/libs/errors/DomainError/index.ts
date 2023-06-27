import { HttpStatus } from '@nestjs/common';
import { ErrorId } from '..';

abstract class DomainError extends Error {
  protected constructor(
    readonly message: string,
    readonly code: HttpStatus,
    readonly id: ErrorId,
  ) {
    super(message);
  }

  toJSON() {
    return {
      message: this.message,
      id: this.id,
      code: this.code,
    };
  }
}

export default DomainError;
