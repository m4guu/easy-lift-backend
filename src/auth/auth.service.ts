import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';

import { CreateUserDto } from './dto/CreateUserDto';
import { LoginPayload, User } from 'src/common/interfaces';
import { AssignedEmailError } from './errors/AssignedEmailError';
import { MissingTokenError } from './errors/MissingTokenError';
import { ServerError } from 'src/libs/errors';
import { InvalidTokenError } from './errors/InvalidTokenError';
import { Error } from 'src/libs/errors/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
  }

  async validateUserByToken(
    token: string | undefined,
  ): Promise<Omit<User, 'password'> | null> {
    if (!token) {
      throw new MissingTokenError();
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findUserByEmail(decodedToken.email);
      if (!user || !decodedToken) {
        throw new InvalidTokenError();
      }
      return user;
    } catch (error) {
      throw new ServerError();
    }
  }

  async register(createUserDto: CreateUserDto): Promise<boolean | Error> {
    const user = await this.usersService.findUserByEmail(createUserDto.email);
    if (user) {
      throw new AssignedEmailError();
    }
    return await this.usersService.create(createUserDto);
  }

  login(user: User): { user: User; token: string } {
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
