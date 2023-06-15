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

    await this.weightHistoryRepository.save(weightHistory);
    return true;
  }

  async update({ userId, weight }: WeightUpdate): Promise<boolean> {
    const weightHistory = await this.weightHistoryRepository.findOneBy({
      userId: userId,
    });

    if (weightHistory && weightHistory.id) {
      const newBodyWeight: BodyWeight = {
        date: format(new Date(), 'yyyy-MM-dd'),
        weight: weight,
      };
      weightHistory.bodyWeights.push(newBodyWeight);
      await this.weightHistoryRepository.save(weightHistory).then(async () => {
        // update user current weight
        this.usersService.updateUserWeight(userId, weight);
      });
      return true;
    } else {
      throw new NotFoundException('Weight history not found');
    }
  }
}
