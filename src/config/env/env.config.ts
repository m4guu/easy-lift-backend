// env configuration

export const envFilePath = `${process.cwd()}/src/config/env/.env.${
  process.env.NODE_ENV
}`;

export const envConfig = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI,
});
