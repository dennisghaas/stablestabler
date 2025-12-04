import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from './config/config';
import { ConfigModule } from './config/config.module';
import { HighscoreModule } from './highscore/highscore.module';
import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { join } from 'path';
import { RoomModule } from './room/room.module';
import { FrontendController } from './frontend/frontend.controller';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRootAsync({
      inject: [Config],
      useFactory: (config: Config): ServeStaticModuleOptions[] => [
        {
          rootPath: join(__dirname, '../../frontend', ''),
          exclude: ['/'],
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
    RoomModule,
  ],
  controllers: [FrontendController],
})
export class AppModule {}
