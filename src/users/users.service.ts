import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/auth/dto/CreateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities';
import { MongoRepository } from 'typeorm';
import { ConfiguredUserDto } from './dto/ConfiguredUser.dto';
import { ObjectId } from 'mongodb';
import { ConfiguredTrainerDto } from './dto/ConfiguredTrainer.dto';
import { UpdateEmailDto } from './dto/UpdateEmail.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { saltRounds } from './constans';
import { WeightHistoryService } from 'src/weight-history/weight-history.service';
import { Role } from 'src/common/enums';
import { PAGE_SIZE } from 'src/config/constans';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
    @Inject(forwardRef(() => WeightHistoryService))
    private weightHistoryService: WeightHistoryService,
  ) {}

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async getUsersByRole(role: Role, page: number): Promise<User[]> {
    const skip = (+page - 1) * PAGE_SIZE;
    return await this.usersRepository.find({
      where: { role },
      skip,
      take: PAGE_SIZE,
    });
  }

  async findUserByEmail(userEmail: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email: userEmail });
  }

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      email: createUserDto.email,
      role: createUserDto.role,
      password: hashedPassword,
      isConfigured: false,
    });

    await this.usersRepository.save(user).then(async () => {
      // create user weight history
      await this.weightHistoryService.create(user.id.toString());
    });

    return true;
  }

  async configureUser(
    userId: string,
    configuredUserDto: ConfiguredUserDto,
    filePath: string | undefined,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(userId),
    });

    const configuredUser: Partial<User> = {
      name: configuredUserDto.name,
      isConfigured: true,
      image: filePath || user.image,
      currentWeight: Number(configuredUserDto.currentWeight),
      height: Number(configuredUserDto.height),
    };

    if (user && user.id) {
      await this.usersRepository
        .update(user.id, configuredUser)
        .then(async () => {
          // update user weight history
          await this.weightHistoryService.update({
            userId: user.id.toString(),
            weight: Number(configuredUserDto.currentWeight),
          });
        });
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async updateUserWeight(userId: string, weight: number): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(userId),
    });

    if (user && user.id) {
      await this.usersRepository.update(user.id, { currentWeight: weight });
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async configureTrainer(
    userId: string,
    configuredTrainerDto: ConfiguredTrainerDto,
    filePath?: string,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(userId),
    });

    const configuredTrainer: Partial<User> = {
      name: configuredTrainerDto.name,
      isConfigured: true,
      image: filePath || user.image,
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

  async updateEmail(updateEmailDto: UpdateEmailDto): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(updateEmailDto.userId),
    });

    if (
      user &&
      (await bcrypt.compare(updateEmailDto.password, user.password))
    ) {
      await this.usersRepository.update(user.id, {
        email: updateEmailDto.newEmail,
      });
      return true;
    } else {
      throw new BadRequestException('Wrong password');
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(updatePasswordDto.userId),
    });

    if (
      user &&
      (await bcrypt.compare(updatePasswordDto.password, user.password))
    ) {
      const newSalt = await bcrypt.genSalt(saltRounds);
      const newHashedPassword = await bcrypt.hash(
        updatePasswordDto.newPassword,
        newSalt,
      );

      await this.usersRepository.update(user.id, {
        password: newHashedPassword,
      });
      return true;
    } else {
      throw new BadRequestException('Wrong password');
    }
  }
}
