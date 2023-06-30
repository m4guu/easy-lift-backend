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
import { Error } from 'src/libs/errors/common';
import { WorkoutNotFoundError } from './errors/WokroutNotFoundError';
import { AppHttpException, ServerError } from 'src/libs/errors';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workouts)
    private readonly workoutsRepository: MongoRepository<Workouts>,
    private userProgressService: UserProgressService,
  ) {}

  async findOne(id: string): Promise<Workouts | Error> {
    try {
      return await this.workoutsRepository.findOneBy({ _id: new ObjectId(id) });
    } catch (error) {
      throw new WorkoutNotFoundError();
    }
  }

  async findAllByQueries(
    query: GetWorkoutsQueryDto,
  ): Promise<Workouts[] | Error> {
    const skip = (+query.page - 1) * PAGE_SIZE;
    const filters = generateWorkoutFiltersByQuery(query);
    try {
      return await this.workoutsRepository.find({
        where: filters,
        skip,
        take: PAGE_SIZE,
      });
    } catch (error) {
      throw new ServerError();
    }
  }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<boolean | Error> {
    const workout = this.workoutsRepository.create(createWorkoutDto);
    workout.date = new Date(workout.date);

    await this.workoutsRepository
      .save(workout)
      .then(async () => {
        if (!workout.isDraft) {
          const userProgress = generateUserProgress(workout);
          for (const userProgres of userProgress) {
            try {
              await this.userProgressService.create(userProgres);
            } catch (error) {
              throw new AppHttpException(error);
            }
          }
        }
      })
      .catch(() => {
        throw new ServerError();
      });

    return true;
  }

  async update(
    id: string,
    updatedWorkout: CreateWorkoutDto,
  ): Promise<boolean | Error> {
    try {
      await this.workoutsRepository.findOneAndReplace(
        { _id: new ObjectId(id) },
        updatedWorkout,
      );
      return true;
    } catch (error) {
      throw new ServerError();
    }
  }

  async delete(id: string): Promise<boolean | Error> {
    await this.workoutsRepository
      .delete(id)
      .then(
        async () =>
          await this.userProgressService.delete(id).catch((error) => {
            throw new AppHttpException(error);
          }),
      )
      .catch(() => {
        throw new ServerError();
      });
    return true;
  }
}
