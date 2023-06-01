import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/auth/dto/CreateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities';
import { MongoRepository } from 'typeorm';
import { UpdatedUserDto } from './dto/UpdatedUserDto';
import { ObjectId } from 'mongodb';

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

  async update(
    userId: string,
    updatedUserDto: UpdatedUserDto,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(userId),
    });

    if (user && user.id) {
      await this.usersRepository.update(user.id, updatedUserDto);
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
