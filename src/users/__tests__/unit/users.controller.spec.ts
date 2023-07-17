import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from '../../users.controller';
import { UsersService } from '../../users.service';

describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });
  describe('initial tests', () => {
    it('streamers controller should be defined', () => {
      expect(controller).toBeDefined();
    });
    it('streamers service should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
