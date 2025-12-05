import { Module } from '@nestjs/common';
import { HighscoreService } from './highscore.service';
import { HighscoreController } from './highscore.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighscoreEntity } from './entity/highscore.entity';
import { HighscoreCron } from './highscore.cron';

@Module({
  imports: [TypeOrmModule.forFeature([HighscoreEntity])],
  providers: [HighscoreService, HighscoreCron],
  controllers: [HighscoreController],
})
export class HighscoreModule {}
