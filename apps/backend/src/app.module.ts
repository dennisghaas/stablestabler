import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from './config/config';
import { ConfigModule } from './config/config.module';
import { HighscoreModule } from './highscore/highscore.module';
import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { RoomModule } from './room/room.module';
import { ScheduleModule } from '@nestjs/schedule';
import { resolveFrontendDistDirHelper } from '@/src/helper';

@Module({
  imports: [
    ConfigModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRootAsync({
      inject: [Config],
      useFactory: (): ServeStaticModuleOptions[] => [
        {
          rootPath: resolveFrontendDistDirHelper(),
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [Config],
      useFactory: (config: Config): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.getDbHost(),
        port: config.getDbPort(),
        username: config.getDbUser(),
        password: config.getDbPassword(),
        database: config.getDbName(),
        autoLoadEntities: true,
        synchronize: config.getDbSync(),
      }),
    }),
    HighscoreModule,
    // RoomModule,
  ],
  controllers: [],
})
export class AppModule {}
