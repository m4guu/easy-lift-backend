import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';

import { CreateUserDto } from './dto/CreateUserDto';
import { LoginPayload, User } from 'src/common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
  }

  async register(createUserDto: CreateUserDto): Promise<boolean> {
    return await this.usersService.create(createUserDto);
  }

  async login(user: User): Promise<{ user: User; token: string }> {
    const payload: LoginPayload = {
      email: user.email,
      sub: user.id.toString(),
      role: user.role,
    };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
