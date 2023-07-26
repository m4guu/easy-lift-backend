import {
  Controller,
  Patch,
  Get,
  Query,
  Body,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './users.service';
import { ConfiguredUserDto } from './dto/ConfiguredUser.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { multerOptions } from '../config/multer.config';
import { ConfiguredTrainerDto } from './dto/ConfiguredTrainer.dto';
import { UpdateEmailDto } from './dto/UpdateEmail.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { TrainersByQueryDto } from './dto/TrainersByQueryDto';
import { AppHttpException } from '../libs/errors';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findTrainersByQuery(@Query() query: TrainersByQueryDto) {
    try {
      return this.usersService.findTrainersByQuery(query);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/configure/user/:id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async configureUser(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() configuredUserDto: ConfiguredUserDto,
  ) {
    const imagePath = file ? file.path : undefined;
    try {
      return await this.usersService.configureUser(
        id,
        configuredUserDto,
        imagePath,
      );
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/configure/trainer/:id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async configureTrainer(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() configuredTrainerDto: ConfiguredTrainerDto,
  ) {
    const imagePath = file ? file.path : undefined;
    try {
      return this.usersService.configureTrainer(
        id,
        configuredTrainerDto,
        imagePath,
      );
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/updateEmail')
  async updateEmail(@Body() updateEmailDto: UpdateEmailDto) {
    try {
      return await this.usersService.updateEmail(updateEmailDto);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/updatePassword')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    try {
      return await this.usersService.updatePassword(updatePasswordDto);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }
}
