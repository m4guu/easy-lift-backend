import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProgres } from 'src/common/entities';
import { MongoRepository } from 'typeorm';
import { GetUserProgressQueryDto } from './dto/GetUserProgressQueryDto';
import { generateUserProgresFiltersByQuery } from 'src/utils';

@Injectable()
export class UserProgressService {
  constructor(
    @InjectRepository(UserProgres)
    private readonly userProgressRepository: MongoRepository<UserProgres>,
  ) {}

  async findAllByQueries(
    query: GetUserProgressQueryDto,
  ): Promise<UserProgres[]> {
    const filters = generateUserProgresFiltersByQuery(query);

    return await this.userProgressRepository.find({
      where: filters,
    });
  }

  async create(createUserProgress: Omit<UserProgres, 'id'>): Promise<boolean> {
    const userProgres = this.userProgressRepository.create(createUserProgress);
    await this.userProgressRepository.save(userProgres);
    return true;
  }

  async delete(workoutId: string): Promise<boolean> {
    await this.userProgressRepository.deleteMany({ workoutId });
    return true;
  }
}
