import { Module } from '@nestjs/common';
import { HighscoreService } from './highscore.service';
import { HighscoreController } from './highscore.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighscoreEntity } from './entity/highscore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HighscoreEntity])],
  providers: [HighscoreService],
  controllers: [HighscoreController],
})
export class HighscoreModule {}
