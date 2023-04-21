import * as Joi from 'joi';

export const envValidation = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production'),
  PORT: Joi.number().default(3000),
  MONGODB_URI: Joi.string().required(),
});
