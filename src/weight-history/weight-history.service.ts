import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { format } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { WeightHistory } from 'src/common/entities';
import { BodyWeight, WeightUpdate } from 'src/common/interfaces';
import { UsersService } from 'src/users/users.service';
import { WeightHistoryNotFound } from './errors/WeightHistoryNotFound';
import { AppHttpException, ServerError } from 'src/libs/errors';

@Injectable()
export class WeightHistoryService {
  constructor(
    @InjectRepository(WeightHistory)
    private readonly weightHistoryRepository: MongoRepository<WeightHistory>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async getWeightHistoryByUserId(userId: string): Promise<WeightHistory> {
    return this.weightHistoryRepository.findOneBy({ userId: userId });
  }

  async create(userId: string): Promise<boolean> {
    const weightHistory = this.weightHistoryRepository.create({
      userId: userId,
      bodyWeights: [],
    });

    try {
      await this.weightHistoryRepository.save(weightHistory);
      return true;
    } catch (error) {
      throw new ServerError();
    }
  }

  async update({ userId, weight }: WeightUpdate): Promise<boolean | Error> {
    const weightHistory = await this.weightHistoryRepository.findOneBy({
      userId: userId,
    });

    if (!weightHistory) {
      throw new WeightHistoryNotFound();
    }

    const newBodyWeight: BodyWeight = {
      date: format(new Date(), 'yyyy-MM-dd'),
      weight: weight,
    };
    weightHistory.bodyWeights.push(newBodyWeight);
    try {
      return await this.weightHistoryRepository
        .save(weightHistory)
        .then(async () => {
          // try update user current weight
          try {
            await this.usersService.updateUserWeight(userId, weight);
            return true;
          } catch (err) {
            throw new AppHttpException(err);
          }
        });
    } catch (error) {
      throw new ServerError();
    }
  }
}
