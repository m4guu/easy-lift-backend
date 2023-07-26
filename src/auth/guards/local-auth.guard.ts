import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppHttpException, ServerError } from '../../libs/errors';
import { InvalidLoginCredentialsError } from '../errors/InvalidLoginCredentialsError';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  handleRequest(err: any, user: any) {
    if (!user) {
      throw new AppHttpException(new InvalidLoginCredentialsError());
    } else if (err) {
      throw new AppHttpException(new ServerError());
    }
    return user;
  }
}
