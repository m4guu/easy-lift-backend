import { Test } from '@nestjs/testing';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users.service';
import { WeightHistoryService } from '../../../weight-history/weight-history.service';

import { ServerError } from '../../../libs/errors';
import { UserNotFoundError } from '../../errors/UserNotFoundError';
import { Error } from '../../../libs/errors/common';
import { User } from '../../../common/entities';
import { MockType } from '../../../common/types';
import {
  ErrorMock,
  HASHED_PASSWORD,
  ID_MOCK,
  configureUserDtoMock,
  createUserDtoMock,
  createdUserMock,
  userMock,
} from '../constans';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '../../../__mocks__/repositories';

jest.mock('../../../weight-history/weight-history.service');

describe('UserService', () => {
  let service: UsersService;
  let weightHistoryService: jest.Mocked<WeightHistoryService>;
  let repository: MockType<MongoRepository<User>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, WeightHistoryService, UserRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    weightHistoryService =
      module.get<jest.Mocked<WeightHistoryService>>(WeightHistoryService);
    repository = module.get(USER_REPOSITORY_TOKEN);

    jest.clearAllMocks();
  });

  describe('initial tests', () => {
    it('user service should be defined', () => {
      expect(service).toBeDefined();
    });
    it('weight history service should be defined', () => {
      expect(weightHistoryService).toBeDefined();
    });
    it('user repository should be defined', () => {
      expect(repository).toBeDefined();
    });
  });

  describe('create method', () => {
    beforeEach(() => {
      repository.create.mockReturnValue(createdUserMock());
      // mock genSalt and hash functions
      jest
        .spyOn(bcrypt, 'genSalt')
        .mockImplementation(() => Promise.resolve('salt-mock'));
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve(HASHED_PASSWORD));
    });

    describe('positive scenarios', () => {
      let isCreated: boolean | Error;

      beforeEach(async () => {
        repository.save.mockResolvedValue({} as never);
        weightHistoryService.create.mockResolvedValue(true);

        isCreated = await service.create(createUserDtoMock());
      });

      it('should call weightHistoryService.create with hashed password', () => {
        expect(repository.create).toBeCalledWith({
          ...createUserDtoMock(),
          password: HASHED_PASSWORD,
          isConfigured: false,
        });
      });
      it('should call repository.save', () => {
        expect(repository.save).toBeCalledWith(createdUserMock());
      });
      // TODO: remove when the users service question is resolved
      it('should call weightHistoryService.create', () => {
        expect(weightHistoryService.create).toBeCalledWith(
          createdUserMock().id,
        );
      });
      it('should return true', () => {
        expect(isCreated).toEqual(true);
      });
    });

    describe('negative scenarios', () => {
      it('should throw an server error when saving the user fails', async () => {
        repository.save.mockRejectedValue(new ErrorMock() as never);

        expect(service.create(createUserDtoMock())).rejects.toThrow(
          ServerError,
        );
      });

      it('should throw an server error when creating user weight history fails', async () => {
        repository.save.mockResolvedValue({} as never);
        weightHistoryService.create.mockRejectedValue(new ErrorMock());

        expect(service.create(createUserDtoMock())).rejects.toThrow(
          ServerError,
        );
      });
    });
  });

  describe('configureUser', () => {
    describe('positive scenarios', () => {
      let isConfigured: boolean | Error;
      beforeEach(async () => {
        repository.findOneBy.mockResolvedValue(userMock() as never);
        repository.update.mockResolvedValue({} as never);

        weightHistoryService.update.mockResolvedValue(true);

        isConfigured = await service.configureUser(
          ID_MOCK,
          configureUserDtoMock(),
          undefined,
        );
      });
      it('should call weightHistoryService.update', () => {
        expect(weightHistoryService.update).toBeCalledWith({
          userId: userMock().id.toString(),
          weight: configureUserDtoMock().currentWeight,
        });
      });
      it('should return true', () => {
        expect(isConfigured).toEqual(true);
      });
    });

    describe('negative scenarios', () => {
      it('should throw UserNotFoundError when the user is not found', () => {
        repository.findOneBy.mockResolvedValue(undefined as never);

        expect(
          service.configureUser(ID_MOCK, configureUserDtoMock(), undefined),
        ).rejects.toThrow(UserNotFoundError);
      });
      it('should throw ServerError when user configuration fails', () => {
        repository.findOneBy.mockResolvedValue(userMock() as never);
        repository.update.mockRejectedValue(new ErrorMock() as never);

        expect(
          service.configureUser(ID_MOCK, configureUserDtoMock(), undefined),
        ).rejects.toThrow(ServerError);
      });
      it('should throw ServerError when updating user weight history fails', () => {
        repository.findOneBy.mockResolvedValue(userMock() as never);
        repository.update.mockResolvedValue({} as never);

        weightHistoryService.update.mockRejectedValue(new ErrorMock());

        expect(
          service.configureUser(ID_MOCK, configureUserDtoMock(), undefined),
        ).rejects.toThrow(ServerError);
      });
    });
  });
});
