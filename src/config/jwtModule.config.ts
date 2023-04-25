import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Environment } from './env/env.config';

export const jwtConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get(Environment.JWT_SECRET),
  signOptions: {
    expiresIn: configService.get(Environment.EXPIRATION_TIME),
  },
});
