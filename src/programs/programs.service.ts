import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { generateProgramFiltersByQuery } from 'src/utils';

import { CreateProgramDto } from './dto/CreateProgramDto';
import { GetProgramsQueryDto } from './dto/GetProgramsQueryDto';

import { ProgramNotFoundError } from './errors/ProgramNotFoundError';
import { ServerError } from 'src/libs/errors';

import { ProgramLevels } from 'src/common/enums';
import { PAGE_SIZE } from 'src/config/constans';
import { Programs } from 'src/common/entities';
import { Error } from 'src/libs/errors/common';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Programs)
    private readonly programsRepository: MongoRepository<Programs>,
  ) {}

  async findOne(id: string): Promise<Programs | Error> {
    try {
      return await this.programsRepository.findOneBy({ _id: new ObjectId(id) });
    } catch (error) {
      throw new ProgramNotFoundError();
    }
  }

  async findAll(query: GetProgramsQueryDto): Promise<Programs[] | Error> {
    const skip = (+query.page - 1) * PAGE_SIZE;
    const take = +query.limit || PAGE_SIZE;

    const filters = generateProgramFiltersByQuery(query);
    try {
      return await this.programsRepository.find({
        where: filters,
        skip,
        take,
      });
    } catch (error) {
      throw new ServerError();
    }
  }

  async createProgram(
    program: CreateProgramDto,
    filePath: string,
  ): Promise<boolean | Error> {
    const newProgram = this.programsRepository.create({
      creator: program.creator,
      title: program.title,
      level: program.level as ProgramLevels,
      frequencyPerWeek: Number(program.frequencyPerWeek),
      programLength: Number(program.programLength),
      program: JSON.parse(program.program),
      image: filePath,
      price: Number(program.price),
      description: program.description,
    });

    try {
      await this.programsRepository.save(newProgram);
      return true;
    } catch (error) {
      throw new ServerError();
    }
  }

  async update(
    programId: string,
    updatedProgram: Partial<CreateProgramDto>,
    filePath?: string,
  ): Promise<boolean | Error> {
    const program = await this.programsRepository.findOneBy({
      _id: new ObjectId(programId),
    });
    if (!program) {
      throw new ProgramNotFoundError();
    }

    const newProgram: Partial<Programs> = {
      title: updatedProgram.title,
      image: filePath || program.image,
      price: Number(updatedProgram.price),
      description: updatedProgram.description,
    };

    try {
      await this.programsRepository.update(program.id, newProgram);
      return true;
    } catch (error) {
      throw new ServerError();
    }
  }

  async delete(id: string): Promise<boolean | Error> {
    try {
      await this.programsRepository.delete(id);
      return true;
    } catch (error) {
      throw new ServerError();
    }
  }
}
