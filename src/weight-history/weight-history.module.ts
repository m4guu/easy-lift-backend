import { Module, forwardRef } from '@nestjs/common';
import { WeightHistoryController } from './weight-history.controller';
import { WeightHistoryService } from './weight-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightHistory } from '../common/entities';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([WeightHistory]),
  ],
  providers: [WeightHistoryService],
  controllers: [WeightHistoryController],
  exports: [WeightHistoryService],
})
export class WeightHistoryModule {}
