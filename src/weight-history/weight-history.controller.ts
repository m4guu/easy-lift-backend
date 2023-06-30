import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { WeightHistoryService } from './weight-history.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateWeightDto } from './dto/UpdateWeight.dto';
import { AppHttpException } from 'src/libs/errors';

@Controller('weight-history')
export class WeightHistoryController {
  constructor(private readonly weightHistoryService: WeightHistoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async getUserWeightHistory(@Param('userId') userId: string) {
    try {
      return await this.weightHistoryService.getWeightHistoryByUserId(userId);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @Patch('/update')
  async updateWeightHistory(@Body() updateWeightDto: UpdateWeightDto) {
    try {
      return await this.weightHistoryService.update(updateWeightDto);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }
}
