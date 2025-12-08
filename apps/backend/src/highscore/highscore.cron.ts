import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HighscoreService } from './highscore.service';
import { GameMode } from '../../../../types/enums/highscore.enum';

@Injectable()
export class HighscoreCron {
  private readonly logger = new Logger(HighscoreCron.name);
  constructor(private readonly highscoreService: HighscoreService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeOldHighscores() {
    const modes = [GameMode.SINGLE, GameMode.MULTI];
    const maxStoredScores: number = 10;

    await Promise.all(
      modes.map(async (mode) => {
        this.logger.log(`[Highscore in ${mode}] Start cleaning scores`);
        const scores = await this.highscoreService.findByMode(mode);
        if (scores.length <= maxStoredScores) {
          this.logger.log(
            `[Highscore in ${mode}] No deletable items found. No more than ${maxStoredScores} Highscores found.`,
          );
          return;
        }

        const scoresToDelete = scores.slice(maxStoredScores);
        if (scoresToDelete.length === 0) {
          this.logger.log(
            `[Highscore in ${mode}] ${scoresToDelete.length} scores found to be deleted`,
          );
          return;
        }

        const removeCount =
          await this.highscoreService.removeMany(scoresToDelete);
        if (removeCount === 0) {
          this.logger.warn(
            `[Highscore in ${mode}] No scores were deleted although deletable scores were found.`,
          );
          return;
        }

        this.logger.log(
          `[Highscore in ${mode}] ${removeCount} scores deleted.`,
        );
      }),
    );
  }
}
