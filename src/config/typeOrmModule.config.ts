import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Environment } from './env/env.config';

export const typeOrmModuleConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mongodb',
    url: configService.get<string>(Environment.MONGODB_URI),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
};
