import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from 'src/common/entities';
import { FindOptionsWhere, MongoRepository, Between } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateWorkoutDto } from './dto/CreateWorkoutDto';
import { PAGE_SIZE } from 'src/config/constans';
import { GetWorkoutsQueryDto } from './dto/GetWorkoutsQueryDto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workouts)
    private readonly workoutsRepository: MongoRepository<Workouts>,
  ) {}

  async findOne(id: string): Promise<Workouts> {
    return await this.workoutsRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async findAllByQueries(query: GetWorkoutsQueryDto): Promise<Workouts[]> {
    const skip = (+query.page - 1) * PAGE_SIZE;

    const filter: FindOptionsWhere<Workouts> = {};

    if (query.creator) {
      filter.creator = query.creator;
    }
    if (query.monthNumber) {
      const year = new Date().getFullYear();
      const startOfMonth = new Date(year, +query.monthNumber - 1, 1);
      const endOfMonth = new Date(year, +query.monthNumber, 0, 23, 59, 59);
      // ? question: why this is not working ?
      filter.date = Between(startOfMonth, endOfMonth);
    }

    return await this.workoutsRepository.find({
      where: filter,
      skip,
      take: PAGE_SIZE,
    });
  }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<boolean> {
    const workout = this.workoutsRepository.create(createWorkoutDto);
    workout.date = new Date(workout.date);

    await this.workoutsRepository.save(workout);
    return true;
  }

  async update(id: string, updatedWorkout: CreateWorkoutDto): Promise<boolean> {
    await this.workoutsRepository.findOneAndReplace(
      { _id: new ObjectId(id) },
      updatedWorkout,
    );
    return true;
  }

  async delete(id: string): Promise<boolean> {
    await this.workoutsRepository.delete(id);
    return true;
  }
}
