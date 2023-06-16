import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { WeightHistoryService } from './weight-history.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateWeightDto } from './dto/UpdateWeight.dto';

@Controller('weight-history')
export class WeightHistoryController {
  constructor(private readonly weightHistoryService: WeightHistoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async getUserWeightHistory(@Param('userId') userId: string) {
    return this.weightHistoryService.getWeightHistoryByUserId(userId);
  }

  @Patch('/update')
  async updateWeightHistory(@Body() updateWeightDto: UpdateWeightDto) {
    return this.weightHistoryService.update(updateWeightDto);
  }
}
