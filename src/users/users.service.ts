import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/auth/dto/CreateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities';
import { MongoRepository } from 'typeorm';
import { ConfiguredUserDto } from './dto/ConfiguredUserDto';
import { ObjectId } from 'mongodb';
import { BodyWeight } from 'src/common/interfaces';
import { ConfiguredTrainerDto } from './dto/ConfiguredTrainer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserByEmail(userEmail: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email: userEmail });
  }

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      email: createUserDto.email,
      role: createUserDto.role,
      password: hashedPassword,
      isConfigured: false,
    });
    await this.usersRepository.save(user);

    return true;
  }

  async configureUser(
    userId: string,
    configuredUserDto: ConfiguredUserDto,
    filePath: string,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(userId),
    });

    const configuredUser: Partial<User> = {
      name: configuredUserDto.name,
      isConfigured: true,
      image: filePath,
      bodyWeights: JSON.parse(configuredUserDto.bodyWeights),
      height: Number(configuredUserDto.height),
    };

    if (user && user.id) {
      await this.usersRepository.update(user.id, configuredUser);
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async configureTrainer(
    userId: string,
    configuredTrainerDto: ConfiguredTrainerDto,
    filePath: string,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(userId),
    });

    const configuredTrainer: Partial<User> = {
      name: configuredTrainerDto.name,
      isConfigured: true,
      image: filePath,
      description: configuredTrainerDto.description,
      gyms: JSON.parse(configuredTrainerDto.gyms),
    };

    if (user && user.id) {
      await this.usersRepository.update(user.id, configuredTrainer);
      return true;
    } else {
      throw new NotFoundException('Trainer not found');
    }
  }
}
