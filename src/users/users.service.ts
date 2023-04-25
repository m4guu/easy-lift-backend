import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from 'src/common/interfaces';
import { CreateUserDto } from 'src/auth/dto/CreateUserDto';

@Injectable()
export class UsersService {
  // todo: refactory with real database
  private users: User[] = [];
  constructor() {
    this.users = [];
  }

  async findUserByEmail(userEmail: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === userEmail);
  }

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser: User = {
      id: Date.now().toString(),
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role,
      isConfigured: false,
      name: '',
      image: undefined,
      expirationDate: '',
    };
    // todo: refactory with real database
    this.users.push(newUser);

    // ? QUESTION: what i should return here ? newUser without password ?
    return true;
  }
}
