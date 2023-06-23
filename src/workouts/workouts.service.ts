import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from 'src/common/entities';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateWorkoutDto } from './dto/CreateWorkoutDto';
import { PAGE_SIZE } from 'src/config/constans';
import { GetWorkoutsQueryDto } from './dto/GetWorkoutsQueryDto';
import generateWorkoutFiltersByQuery from 'src/utils/GenerateWorkoutFiltersByQuery';
import { generateUserProgress } from 'src/utils';
import { UserProgressService } from 'src/user-progress/user-progress.service';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workouts)
    private readonly workoutsRepository: MongoRepository<Workouts>,
    private userProgressService: UserProgressService,
  ) {}

  async findOne(id: string): Promise<Workouts> {
    return await this.workoutsRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async findAllByQueries(query: GetWorkoutsQueryDto): Promise<Workouts[]> {
    const skip = (+query.page - 1) * PAGE_SIZE;

    const filters = generateWorkoutFiltersByQuery(query);

    return await this.workoutsRepository.find({
      where: filters,
      skip,
      take: PAGE_SIZE,
    });
  }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<boolean> {
    const workout = this.workoutsRepository.create(createWorkoutDto);
    workout.date = new Date(workout.date);

    await this.workoutsRepository.save(workout).then(() => {
      if (!workout.isDraft) {
        const userProgress = generateUserProgress(workout);
        userProgress.map(
          async (userProgres) =>
            await this.userProgressService.create(userProgres),
        );
      }
    });
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
    await this.workoutsRepository
      .delete(id)
      .then(() => this.userProgressService.delete(id));
    return true;
  }
}
