import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../common/entities';
import { WeightHistoryModule } from '../weight-history/weight-history.module';

@Module({
  imports: [
    forwardRef(() => WeightHistoryModule),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
