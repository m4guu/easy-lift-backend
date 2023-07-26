import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgres } from '../common/entities';
import { UserProgressController } from './user-progress.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserProgres])],
  providers: [UserProgressService],
  controllers: [UserProgressController],
  exports: [UserProgressService],
})
export class UserProgressModule {}
