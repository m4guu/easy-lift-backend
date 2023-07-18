import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Programs, User } from '../../common/entities';
import { repositoryMockFactory } from '../../utils/tests/repositoryMockFactory';

// TOKENS
export const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
export const PROGRAMS_REPOSITORY_TOKEN = getRepositoryToken(Programs);

// REPOSITORIES
export const UserRepository: Provider = {
  provide: USER_REPOSITORY_TOKEN,
  useFactory: repositoryMockFactory,
};
export const ProgramsRepository: Provider = {
  provide: PROGRAMS_REPOSITORY_TOKEN,
  useFactory: repositoryMockFactory,
};
