import { Controller, Query, UseGuards, Get } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUserProgressQueryDto } from './dto/GetUserProgressQueryDto';
import { AppHttpException } from 'src/libs/errors';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgresService: UserProgressService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: GetUserProgressQueryDto) {
    try {
      return await this.userProgresService.findAllByQueries(query);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }
}
