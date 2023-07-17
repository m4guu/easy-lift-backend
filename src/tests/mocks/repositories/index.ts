import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../../../common/entities';
import { repositoryMockFactory } from '../../../utils/tests/repositoryMockFactory';

// TOKENS
export const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

// REPOSITORIES
export const UserRepository: Provider = {
  provide: USER_REPOSITORY_TOKEN,
  useFactory: repositoryMockFactory,
};
