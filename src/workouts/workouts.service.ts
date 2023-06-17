import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from 'src/common/entities';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateWorkoutDto } from './dto/CreateWorkoutDto';
import { UserWorkoutsQueryDto } from './dto/UserWorkoutsQueryDto';
import { UserWorkoutsByMonthQueryDto } from './dto/UserWorkoutsByMonthQueryDto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workouts)
    private readonly workoutsRepository: MongoRepository<Workouts>,
  ) {}

  async findOne(id: string): Promise<Workouts> {
    return await this.workoutsRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async findWorkoutsByUserId(query: UserWorkoutsQueryDto): Promise<Workouts[]> {
    const { creator: userId, page } = query;

    const pageSize = 10;
    const skip = (+page - 1) * pageSize;

    return await this.workoutsRepository.find({
      where: { creator: userId },
      skip,
      take: pageSize,
    });
  }

  async findWorkoutsByMonth(
    query: UserWorkoutsByMonthQueryDto,
  ): Promise<Workouts[]> {
    const year = new Date().getFullYear();
    const startOfMonth = new Date(year, +query.monthNumber - 1, 1);
    const endOfMonth = new Date(year, +query.monthNumber, 0, 23, 59, 59);

    return await this.workoutsRepository.find({
      where: {
        creator: query.userId,
        date: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      },
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
