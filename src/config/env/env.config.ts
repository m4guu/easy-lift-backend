// env configuration

export const envFilePath = `${process.cwd()}/src/config/env/.env.${
  process.env.NODE_ENV
}`;

export enum Environment {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  MONGODB_URI = 'MONGODB_URI',
}

// ? QUESTION: how to typed envs ?
export const envConfig = () => ({
  [Environment.NODE_ENV]: process.env.NODE_ENV,
  [Environment.PORT]: parseInt(process.env.PORT),
  [Environment.MONGODB_URI]: process.env.MONGODB_URI,
});
