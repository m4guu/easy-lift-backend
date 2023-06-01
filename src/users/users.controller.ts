import { Controller, Put, Body, Param, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdatedUserDto } from './dto/UpdatedUserDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedUser: UpdatedUserDto) {
    return this.usersService.update(id, updatedUser);
  }
}
