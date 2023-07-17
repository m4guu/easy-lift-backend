import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorId } from '../../libs/errors';

export class WorkoutNotFoundError extends DomainError {
  constructor() {
    super(
      'Workout not found.',
      HttpStatus.NOT_FOUND,
      ErrorId.WORKOUT_NOT_FOUND,
    );
  }
}
