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

  async validateUserByToken(
    token: string,
  ): Promise<Omit<User, 'password'> | null> {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      const userEmail = decodedToken.email;

      const user = await this.usersService.findUserByEmail(userEmail);
      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async register(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.usersService.findUserByEmail(createUserDto.email);
    if (!user) {
      return await this.usersService.create(createUserDto);
    } else {
      throw new Error('The email is occupied by another user.');
    }
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
