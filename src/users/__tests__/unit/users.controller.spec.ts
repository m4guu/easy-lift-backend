import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from '../../users.controller';
import { UsersService } from '../../users.service';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '../../../tests/mocks/repositories';
import { MockType } from '../../../common/types';
import { MongoRepository } from 'typeorm';
import { User } from '../../../common/entities';
import { Error } from '../../../libs/errors/common';
import {
  ErrorMock,
  ID_MOCK,
  configureUserDtoMock,
  userMock,
} from '../constans';
import { AppHttpException } from '../../../libs/errors';

jest.mock('../../users.service');

describe('UserController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;
  let repository: MockType<MongoRepository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UserRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<jest.Mocked<UsersService>>(UsersService);
    repository = module.get(USER_REPOSITORY_TOKEN);

    jest.clearAllMocks();
  });

  describe('initial tests', () => {
    it('users controller should be defined', () => {
      expect(controller).toBeDefined();
    });
    it('users service should be defined', () => {
      expect(service).toBeDefined();
    });
    it('users repository should be defined', () => {
      expect(repository).toBeDefined();
    });
  });

  describe('findOne controller', () => {
    describe('positive scenarios', () => {
      let user: User | Error;
      beforeEach(async () => {
        service.findOne.mockResolvedValue(userMock());
        user = await controller.findOne(userMock().id.toString());
      });

      it('should call userService.findOne', () => {
        expect(service.findOne).toBeCalledWith(userMock().id.toString());
      });
      it('should return a user', () => {
        expect(user).toEqual(userMock());
      });
    });
    describe('negative scenarios', () => {
      beforeEach(async () => {
        service.findOne.mockRejectedValue(new ErrorMock());
      });
      it('should throw an AppHttpException if service.findOne throws an error', () => {
        expect(controller.findOne(userMock().id.toString())).rejects.toThrow(
          AppHttpException,
        );
      });
    });
  });

  describe('configureUser controller', () => {
    describe('positive scenarios', () => {
      let isConfigured: boolean | Error;
      beforeEach(async () => {
        service.configureUser.mockResolvedValue(true);
        isConfigured = await controller.configureUser(
          ID_MOCK,
          undefined,
          configureUserDtoMock(),
        );
      });

      it('should call userService.configureUser', () => {
        expect(service.configureUser).toBeCalledWith(
          ID_MOCK,
          configureUserDtoMock(),
          undefined,
        );
      });
      it('should return a true', () => {
        expect(isConfigured).toEqual(true);
      });
    });
  });
});
