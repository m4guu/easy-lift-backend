import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';
import { jwtConfig } from '../config/jwtModule.config';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return await jwtConfig(configService);
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
