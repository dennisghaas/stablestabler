import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from './config/config';
import { ConfigModule } from './config/config.module';
import { HighscoreModule } from './highscore/highscore.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [Config],
      useFactory: (config: Config): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.getDbHost(),
        port: config.getDbPort(),
        username: config.getDbUser(),
        password: config.getDbPassword,
        database: config.getDbName(),
        autoLoadEntities: true,
        synchronize: config.getDbSync(),
        dropSchema: true,
      }),
    }),
    HighscoreModule,
  ],
})
export class AppModule {}
