import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programs } from '../common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Programs])],
  providers: [ProgramsService],
  controllers: [ProgramsController],
})
export class ProgramsModule {}
