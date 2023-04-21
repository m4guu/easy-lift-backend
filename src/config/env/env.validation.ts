import * as Joi from 'joi';
import { Environment } from './env.config';

export const envValidation = Joi.object({
  [Environment.NODE_ENV]: Joi.string().valid('development', 'production'),
  [Environment.PORT]: Joi.number().default(3000),
  [Environment.MONGODB_URI]: Joi.string().required(),
});
