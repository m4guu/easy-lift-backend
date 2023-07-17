import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from '../../libs/errors';

export class WeightHistoryNotFound extends DomainError {
  constructor() {
    super(
      'Weight history not found.',
      HttpStatus.NOT_FOUND,
      ErrorId.WEIGHT_HISTORY_NOT_FOUND,
    );
  }
}
