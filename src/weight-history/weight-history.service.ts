import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { format } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { WeightHistory } from '../common/entities';
import { BodyWeight, WeightUpdate } from '..//common/interfaces';
import { UsersService } from '../users/users.service';
import { WeightHistoryNotFound } from './errors/WeightHistoryNotFound';
import { AppHttpException, ServerError } from '../libs/errors';
import { Error } from '../libs/errors/common';

@Injectable()
export class WeightHistoryService {
  constructor(
    @InjectRepository(WeightHistory)
    private readonly weightHistoryRepository: MongoRepository<WeightHistory>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async getWeightHistoryByUserId(
    userId: string,
  ): Promise<WeightHistory | Error> {
    try {
      return await this.weightHistoryRepository.findOneBy({ userId: userId });
    } catch (err) {
      throw new WeightHistoryNotFound();
    }
  }

  async create(userId: string): Promise<boolean | Error> {
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

    const newDate = format(new Date(), 'yyyy-MM-dd');

    const existingWeight = weightHistory.bodyWeights.find(
      (bodyWeight) => bodyWeight.date === newDate,
    );

    if (existingWeight) {
      // If an entry with the same date exists, update the weight
      existingWeight.weight = weight;
    } else {
      // If no entry with the same date exists, add a new entry
      const newBodyWeight: BodyWeight = {
        date: newDate,
        weight: weight,
      };
      weightHistory.bodyWeights.push(newBodyWeight);
    }

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
