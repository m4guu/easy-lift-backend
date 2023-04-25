import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { HasRole } from 'src/auth/decorators/has-role.decorator';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/common/enums';
import { UsersService } from './users.service';
import { User } from 'src/common/entities';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HasRole(Role.trainer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('trainer')
  onlyTrainer(@Request() req) {
    return req.user;
  }

  @HasRole(Role.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('user')
  onlyUser(@Request() req) {
    return req.user;
  }
}
