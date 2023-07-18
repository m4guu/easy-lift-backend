import { MongoRepository } from 'typeorm';
import { MockType } from '../../../common/types';
import { ProgramsController } from '../../programs.controller';
import { ProgramsService } from '../../programs.service';
import { Programs } from '../../../common/entities';
import { Test, TestingModule } from '@nestjs/testing';
import {
  PROGRAMS_REPOSITORY_TOKEN,
  ProgramsRepository,
} from '../../../__mocks__/repositories';
import { Error } from '../../../libs/errors/common';
import { CreateProgramDto } from '../../dto/CreateProgramDto';
import { ErrorMock } from '../../../users/__tests__/constans';
import { AppHttpException } from '../../../libs/errors';

jest.mock('../../programs.service');

describe('ProgramsController', () => {
  let controller: ProgramsController;
  let service: jest.Mocked<ProgramsService>;
  let programRepository: MockType<MongoRepository<Programs>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramsController],
      providers: [ProgramsService, ProgramsRepository],
    }).compile();

    controller = module.get<ProgramsController>(ProgramsController);
    service = module.get<jest.Mocked<ProgramsService>>(ProgramsService);
    programRepository = module.get(PROGRAMS_REPOSITORY_TOKEN);
  });

  describe('initial tests', () => {
    it('program controller should be defined', () => {
      expect(controller).toBeDefined();
    });
    it('program service should be defined', () => {
      expect(service).toBeDefined();
    });
    it('programRepository should be defined', () => {
      expect(programRepository).toBeDefined();
    });
  });

  describe('create controller', () => {
    const file = {
      path: 'path-mock',
      name: 'file-mock',
    } as unknown as Express.Multer.File;
    const program = 'program-mock' as unknown as CreateProgramDto;

    describe('positive scenarios', () => {
      let isCreated: boolean | Error;

      beforeEach(async () => {
        service.createProgram.mockResolvedValue(true);
        isCreated = await controller.create(file, program);
      });

      it('should call service.createProgram', () => {
        expect(service.createProgram).toBeCalledWith(program, file.path);
      });
      it('should return true', () => {
        expect(isCreated).toEqual(true);
      });
    });

    describe('negative scenarios', () => {
      it('should throw an AppHttpException if service.createProgram throws an error', () => {
        service.createProgram.mockRejectedValue(new ErrorMock());

        expect(controller.create(file, program)).rejects.toThrow(
          AppHttpException,
        );
      });
    });
  });
});
