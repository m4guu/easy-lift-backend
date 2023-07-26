import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Body,
  UploadedFile,
  Get,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HasRole } from '../auth/decorators/has-role.decorator';
import { Role } from '../common/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';
import { CreateProgramDto } from './dto/CreateProgramDto';
import { GetProgramsQueryDto } from './dto/GetProgramsQueryDto';
import { AppHttpException } from '../libs/errors';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.programsService.findOne(id);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: GetProgramsQueryDto) {
    try {
      return await this.programsService.findAll(query);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HasRole(Role.trainer)
  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() program: CreateProgramDto,
  ) {
    try {
      return await this.programsService.createProgram(program, file.path);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HasRole(Role.trainer)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updatedProgram: Partial<CreateProgramDto>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : undefined;
    try {
      return await this.programsService.update(id, updatedProgram, imagePath);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HasRole(Role.trainer)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.programsService.delete(id);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }
}
