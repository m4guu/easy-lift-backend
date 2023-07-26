import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '../../auth.service';
import { UsersService } from '../../../users/users.service';
import {
  ErrorMock,
  createUserDtoMock,
  userMock,
} from '../../../users/__tests__/constans';
import { Error } from '../../../libs/errors/common';
import { AssignedEmailError } from '../../errors/AssignedEmailError';
import { AppHttpException } from '../../../libs/errors';

jest.mock('../../../users/users.service');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, JwtService, UsersService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<jest.Mocked<UsersService>>(UsersService);

    jest.clearAllMocks();
  });

  describe('initial tests', () => {
    it('authService should be defined', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('register method', () => {
    describe('positive scenarios', () => {
      let isRegistered: boolean | Error;

      beforeEach(async () => {
        usersService.findUserByEmail.mockResolvedValue(undefined);
        usersService.create.mockResolvedValue(true);

        isRegistered = await authService.register(createUserDtoMock());
      });

      it('should call usersService.create', () => {
        expect(usersService.create).toBeCalledWith(createUserDtoMock());
      });
      it('should return true', () => {
        expect(isRegistered).toEqual(true);
      });
    });

    describe('negative scenarios', () => {
      it('should throw an AssignedEmailError if usersService find user by provided email', () => {
        usersService.findUserByEmail.mockResolvedValue(userMock());

        expect(authService.register(createUserDtoMock())).rejects.toThrow(
          AssignedEmailError,
        );
      });
      it('should throw an AppHttpException when create the user fails', () => {
        usersService.findUserByEmail.mockResolvedValue(undefined);
        usersService.create.mockRejectedValue(new ErrorMock());

        expect(authService.register(createUserDtoMock())).rejects.toThrow(
          AppHttpException,
        );
      });
    });
  });
});
