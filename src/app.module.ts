import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { envFilePath, envConfig } from './config/env/env.config';
import { typeOrmModuleConfig } from './config/typeOrmModule.config';
import { envValidation } from './config/env/env.validation';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { UploadPaths } from './common/enums';
import { WeightHistoryModule } from './weight-history/weight-history.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { ProgramsModule } from './programs/programs.module';
import { UserProgressController } from './user-progress/user-progress.controller';
import { UserProgressModule } from './user-progress/user-progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      load: [envConfig],
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return await typeOrmModuleConfig(configService);
      },
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads', 'avatars'),
      serveRoot: UploadPaths.USERS_AVATARS,
      serveStaticOptions: {
        index: false, // Disable serving index.html
      },
    }),
    AuthModule,
    UsersModule,
    WeightHistoryModule,
    WorkoutsModule,
    ProgramsModule,
    UserProgressModule,
  ],
  controllers: [UserProgressController],
})
export class AppModule {}
