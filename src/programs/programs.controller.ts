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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HasRole } from 'src/auth/decorators/has-role.decorator';
import { Role } from 'src/common/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreateProgramDto } from './dto/CreateProgramDto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('trainer-programs/:id')
  async findTrainerPrograms(
    @Param('id') id: string,
    @Query() query: { page: string },
  ) {
    return await this.programsService.findTrainerPrograms(id, +query.page);
  }

  @UseGuards(JwtAuthGuard)
  @Get('10-programs')
  async get10Programs() {
    return await this.programsService.get10Programs();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.programsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: { page: string }) {
    return await this.programsService.findAll(+query.page);
  }

  @UseGuards(JwtAuthGuard)
  @HasRole(Role.trainer)
  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() program: CreateProgramDto,
  ) {
    return this.programsService.createProgram(program, file.path);
  }

  @UseGuards(JwtAuthGuard)
  @HasRole(Role.trainer)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updatedProgram: Partial<CreateProgramDto>,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    const imagePath = file ? file.path : undefined;
    return await this.programsService.update(id, updatedProgram, imagePath);
  }

  @UseGuards(JwtAuthGuard)
  @HasRole(Role.trainer)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.programsService.delete(id);
  }
}
