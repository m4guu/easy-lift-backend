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
import { UserWorkoutsQueryDto } from './dto/UserWorkoutsQueryDto';
import { UserWorkoutsByMonthQueryDto } from './dto/UserWorkoutsByMonthQueryDto';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutService: WorkoutsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('userWorkouts')
  async findWorkoutsByUserId(@Query() query: UserWorkoutsQueryDto) {
    return await this.workoutService.findWorkoutsByUserId(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userWorkoutsByMonth')
  async findUserWorkoutsByMonth(@Query() query: UserWorkoutsByMonthQueryDto) {
    return await this.workoutService.findWorkoutsByMonth(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workoutService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return await this.workoutService.create(createWorkoutDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedWorkout: CreateWorkoutDto,
  ) {
    return await this.workoutService.update(id, updatedWorkout);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.workoutService.delete(id);
  }
}
