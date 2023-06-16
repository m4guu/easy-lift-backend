import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from 'src/common/entities';
import { MongoRepository } from 'typeorm';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workouts)
    private readonly workoutsRepository: MongoRepository<Workouts>,
  ) {}
}
