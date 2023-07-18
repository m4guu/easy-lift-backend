import { Test } from '@nestjs/testing';

import { AuthController } from '../../auth.controller';
import { AuthService } from '../../auth.service';

import {
  ErrorMock,
  createUserDtoMock,
} from '../../../users/__tests__/constans';
import { Error } from '../../../libs/errors/common';
import { AppHttpException } from '../../../libs/errors';

jest.mock('../../auth.service');

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<jest.Mocked<AuthService>>(AuthService);

    jest.clearAllMocks();
  });

  describe('initial tests', () => {
    it('auth controller should be defined', () => {
      expect(controller).toBeDefined();
    });
    it(' authService should be defined', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('register controller', () => {
    describe('positive scenarios', () => {
      let isRegistered: boolean | Error;
      beforeEach(async () => {
        authService.register.mockResolvedValue(true);
        isRegistered = await controller.register(createUserDtoMock());
      });

      it('should call authService.register', () => {
        expect(authService.register).toBeCalledWith(createUserDtoMock());
      });
      it('should return true', () => {
        expect(isRegistered).toEqual(true);
      });
    });
    describe('negative scenarios', () => {
      it('should throw an AppHttpException if authService.register throws an error', () => {
        authService.register.mockRejectedValue(new ErrorMock());

        expect(controller.register(createUserDtoMock())).rejects.toThrow(
          AppHttpException,
        );
      });
    });
  });
});
