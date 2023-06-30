import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateWorkoutDto } from './dto/CreateWorkoutDto';
import { WorkoutsService } from './workouts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetWorkoutsQueryDto } from './dto/GetWorkoutsQueryDto';
import { Role } from 'src/common/enums';
import { HasRole } from 'src/auth/decorators/has-role.decorator';
import { AppHttpException } from 'src/libs/errors';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutService: WorkoutsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.workoutService.findOne(id);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: GetWorkoutsQueryDto) {
    try {
      return await this.workoutService.findAllByQueries(query);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HasRole(Role.user)
  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto) {
    try {
      return await this.workoutService.create(createWorkoutDto);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HasRole(Role.user)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedWorkout: CreateWorkoutDto,
  ) {
    try {
      return await this.workoutService.update(id, updatedWorkout);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HasRole(Role.user)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.workoutService.delete(id);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }
}
