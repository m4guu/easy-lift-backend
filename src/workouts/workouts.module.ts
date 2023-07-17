import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workouts } from '../common/entities';
import { UserProgressModule } from '../user-progress/user-progress.module';

@Module({
  imports: [UserProgressModule, TypeOrmModule.forFeature([Workouts])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
