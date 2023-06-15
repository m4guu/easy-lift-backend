import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Environment } from './env/env.config';
import { User, WeightHistory } from 'src/common/entities';

export const typeOrmModuleConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mongodb',
    url: configService.get<string>(Environment.MONGODB_URI),
    entities: [User, WeightHistory],
    synchronize: true,
  };
};
