import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS_config: CorsOptions = {
  credentials: true,
  origin: 'http://localhost:5173',
};
