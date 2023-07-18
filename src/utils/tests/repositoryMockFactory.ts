import { MongoRepository } from 'typeorm';

import { MockType } from '../../common/types';

export const repositoryMockFactory: <T>() => MockType<MongoRepository<T>> =
  jest.fn(() => ({
    save: jest.fn(),
    create: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    // ... add more methods as needed
  }));
