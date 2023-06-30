import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProgres } from 'src/common/entities';
import { MongoRepository } from 'typeorm';
import { GetUserProgressQueryDto } from './dto/GetUserProgressQueryDto';
import { generateUserProgresFiltersByQuery } from 'src/utils';
import { ServerError } from 'src/libs/errors';

@Injectable()
export class UserProgressService {
  constructor(
    @InjectRepository(UserProgres)
    private readonly userProgressRepository: MongoRepository<UserProgres>,
  ) {}

  async findAllByQueries(
    query: GetUserProgressQueryDto,
  ): Promise<UserProgres[] | Error> {
    const filters = generateUserProgresFiltersByQuery(query);

    try {
      return await this.userProgressRepository.find({
        where: filters,
      });
    } catch (error) {
      throw new ServerError();
    }
  }

  async create(
    createUserProgress: Omit<UserProgres, 'id'>,
  ): Promise<boolean | Error> {
    const userProgres = this.userProgressRepository.create(createUserProgress);
    try {
      await this.userProgressRepository.save(userProgres);
      return true;
    } catch (error) {
      throw new ServerError();
    }
  }

  async delete(workoutId: string): Promise<boolean | Error> {
    try {
      await this.userProgressRepository.deleteMany({ workoutId });
      return true;
    } catch (error) {
      throw new ServerError();
    }
  }
}
