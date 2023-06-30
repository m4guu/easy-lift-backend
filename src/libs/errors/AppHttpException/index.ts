import { HttpException } from '@nestjs/common';
import DomainError from '../DomainError';

class AppHttpException extends HttpException {
  constructor(private domainError: DomainError) {
    super(domainError.toJSON(), domainError.code);
  }
}

export default AppHttpException;
