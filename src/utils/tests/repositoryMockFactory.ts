import { MongoRepository } from 'typeorm';

import { MockType } from '../../common/types';

export const repositoryMockFactory: <T>() => MockType<MongoRepository<T>> =
  jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
    findAll: jest.fn(() => []),
    save: jest.fn((entity) => entity),
    // ... add more methods as needed
  }));
