import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Programs } from 'src/common/entities';
import { MongoRepository } from 'typeorm';
import { CreateProgramDto } from './dto/CreateProgramDto';
import { ProgramLevels } from 'src/common/enums';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Programs)
    private readonly programsRepository: MongoRepository<Programs>,
  ) {}

  async findOne(id: string): Promise<Programs> {
    return await this.programsRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async findAll(page: number): Promise<Programs[]> {
    const pageSize = 10;
    const skip = (+page - 1) * pageSize;

    return await this.programsRepository.find({
      skip,
      take: pageSize,
    });
  }

  async findTrainerPrograms(
    trainerId: string,
    page: number,
  ): Promise<Programs[]> {
    const pageSize = 10;
    const skip = (+page - 1) * pageSize;

    return await this.programsRepository.find({
      where: { 'creator.id': trainerId },
      skip,
      take: pageSize,
    });
  }

  async get10Programs(): Promise<Programs[]> {
    return await this.programsRepository
      .aggregate([{ $sample: { size: 10 } }])
      .toArray();
  }

  async createProgram(
    program: CreateProgramDto,
    filePath: string,
  ): Promise<boolean> {
    const newProgram = this.programsRepository.create({
      creator: JSON.parse(program.creator),
      title: program.title,
      level: program.level as ProgramLevels,
      frequencyPerWeek: Number(program.frequencyPerWeek),
      programLength: Number(program.programLength),
      program: JSON.parse(program.program),
      image: filePath,
      price: Number(program.price),
      description: program.description,
    });

    await this.programsRepository.save(newProgram);
    return true;
  }

  async update(
    programId: string,
    updatedProgram: Partial<CreateProgramDto>,
    filePath: string | undefined,
  ): Promise<boolean> {
    const program = await this.programsRepository.findOneBy({
      _id: new ObjectId(programId),
    });

    const newProgram: Partial<Programs> = {
      title: updatedProgram.title,
      image: filePath || program.image,
      price: Number(updatedProgram.price),
      description: updatedProgram.description,
    };

    if (program && program.id) {
      await this.programsRepository.update(program.id, newProgram);
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async delete(id: string): Promise<boolean> {
    await this.programsRepository.delete(id);
    return true;
  }
}
