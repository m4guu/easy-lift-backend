import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Programs } from 'src/common/entities';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Programs)
    private readonly programsRepository: MongoRepository<Programs>,
  ) {}
}
