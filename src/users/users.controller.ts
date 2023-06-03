import {
  Controller,
  Patch,
  Body,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './users.service';
import { ConfiguredUserDto } from './dto/ConfiguredUserDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { multerOptions } from 'src/config/multer.config';
import { ConfiguredTrainerDto } from './dto/ConfiguredTrainer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/configure/user/:id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async configureUser(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() configuredUserDto: ConfiguredUserDto,
  ) {
    return this.usersService.configureUser(id, configuredUserDto, file.path);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/configure/trainer/:id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async configureTrainer(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() configuredTrainerDto: ConfiguredTrainerDto,
  ) {
    return this.usersService.configureTrainer(
      id,
      configuredTrainerDto,
      file.path,
    );
  }
}
