import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { WeightHistoryService } from '../weight-history/weight-history.service';
import { CreateUserDto } from '../auth/dto/CreateUserDto';
import { ConfiguredUserDto } from './dto/ConfiguredUser.dto';
import { ConfiguredTrainerDto } from './dto/ConfiguredTrainer.dto';
import { UpdateEmailDto } from './dto/UpdateEmail.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { TrainersByQueryDto } from './dto/TrainersByQueryDto';

import { comparePasswords, generateTrainerFiltersByQuery } from '../utils';
import { AppHttpException, ServerError } from '../libs/errors';

import { InvalidPasswordError } from './errors/InvalidPasswordError';
import { UserNotFoundError } from './errors/UserNotFoundError';

import { User } from '../common/entities';
import { Error } from '../libs/errors/common';
import { PAGE_SIZE } from '../config/constans';
import { SALT_ROUNDS } from './constans';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
    @Inject(forwardRef(() => WeightHistoryService))
    private weightHistoryService: WeightHistoryService,
  ) {}

  async findOne(id: string): Promise<User | Error> {
    try {
      return await this.usersRepository.findOneBy({
        _id: new ObjectId(id),
      });
    } catch (err) {
      throw new UserNotFoundError();
    }
  }

  async findTrainersByQuery(
    query: TrainersByQueryDto,
  ): Promise<User[] | Error> {
    const skip = (+query.page - 1) * PAGE_SIZE;
    const filters = generateTrainerFiltersByQuery(query);

    try {
      return await this.usersRepository.find({
        where: {
          role: query.role,
          isConfigured: true,
          ...filters,
        },
        skip,
        take: PAGE_SIZE,
      });
    } catch (error) {
      throw new ServerError();
    }
  }

  async findUserByEmail(userEmail: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email: userEmail });
  }

  async create(createUserDto: CreateUserDto): Promise<boolean | Error> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      email: createUserDto.email,
      role: createUserDto.role,
      password: hashedPassword,
      isConfigured: false,
    });

    try {
      await this.usersRepository.save(user).then(async () => {
        // try create user weight history
        try {
          // ? question: shouldn't this action be in the controller and not caught with the above action in Promise.all ?
          return await this.weightHistoryService.create(user.id.toString());
        } catch (err) {
          throw new AppHttpException(err);
        }
      });
      return true;
    } catch (err) {
      throw new ServerError();
    }
  }

  async configureUser(
    userId: string,
    configuredUserDto: ConfiguredUserDto,
    filePath: string | undefined,
  ): Promise<boolean | Error> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(userId),
    });
    if (!user) {
      throw new UserNotFoundError();
    }
    const configuredUser: Partial<User> = {
      name: configuredUserDto.name,
      isConfigured: true,
      image: filePath || user.image,
      currentWeight: Number(configuredUserDto.currentWeight),
      height: Number(configuredUserDto.height),
    };

    try {
      await this.usersRepository
        .update(user.id, configuredUser)
        .then(async () => {
          // update user weight history
          try {
            await this.weightHistoryService.update({
              userId: user.id.toString(),
              weight: Number(configuredUserDto.currentWeight),
            });
          } catch (error) {
            throw new AppHttpException(error);
          }
        });
      return true;
    } catch (error) {
      throw new ServerError();
    }
  }

  async updateUserWeight(
    userId: string,
    weight: number,
  ): Promise<boolean | Error> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(userId),
    });
    if (!user) {
      throw new UserNotFoundError();
    }
    try {
      await this.usersRepository.update(user.id, { currentWeight: weight });
      return true;
    } catch (err) {
      throw new ServerError();
    }
  }

  async configureTrainer(
    userId: string,
    configuredTrainerDto: ConfiguredTrainerDto,
    filePath?: string,
  ): Promise<boolean | Error> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(userId),
    });
    if (!user) {
      throw new UserNotFoundError();
    }

    const configuredTrainer: Partial<User> = {
      name: configuredTrainerDto.name,
      isConfigured: true,
      image: filePath || user.image,
      description: configuredTrainerDto.description,
      gyms: JSON.parse(configuredTrainerDto.gyms),
    };

    try {
      await this.usersRepository.update(user.id, configuredTrainer);
      return true;
    } catch (error) {
      throw new ServerError();
    }
  }

  async updateEmail(updateEmailDto: UpdateEmailDto): Promise<boolean | Error> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(updateEmailDto.userId),
    });
    if (!user) {
      throw new UserNotFoundError();
    }
    const isValidPassword = await comparePasswords(
      updateEmailDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new InvalidPasswordError();
    }

    try {
      await this.usersRepository.update(user.id, {
        email: updateEmailDto.newEmail,
      });
      return true;
    } catch (err) {
      throw new ServerError();
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(updatePasswordDto.userId),
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const isValidPassword = await comparePasswords(
      updatePasswordDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new InvalidPasswordError();
    }

    try {
      const newSalt = await bcrypt.genSalt(SALT_ROUNDS);
      const newHashedPassword = await bcrypt.hash(
        updatePasswordDto.newPassword,
        newSalt,
      );
      await this.usersRepository.update(user.id, {
        password: newHashedPassword,
      });
      return true;
    } catch (err) {
      throw new ServerError();
    }
  }
}
