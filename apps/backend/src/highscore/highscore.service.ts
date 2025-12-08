import { ConflictException, Injectable } from '@nestjs/common';
import { CreateHighScore } from './dto/highscore.dto';
import { GameMode } from '../../../../types/enums/highscore.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { HighscoreEntity } from './entity/highscore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HighscoreService {
  constructor(
    @InjectRepository(HighscoreEntity)
    private readonly highScoreRepository: Repository<HighscoreEntity>,
  ) {}

  async create(createHighScore: CreateHighScore) {
    if (createHighScore.mode === GameMode.MULTI && !createHighScore.team) {
      throw new ConflictException('Multiplayer needs teams as an input');
    }

    const payload: Partial<HighscoreEntity> = {
      ...createHighScore,
    };

    const save = await this.highScoreRepository.save({
      ...payload,
    });
    if (!save) {
      throw new ConflictException(
        'Your highscore could not be saved. Trough an error. We`re sorry.',
      );
    }

    return {
      message: 'Highscore was successfully created',
    };
  }

  async findByMode(mode: GameMode): Promise<HighscoreEntity[]> {
    return this.highScoreRepository.find({
      where: {
        mode,
      },
      order: { score: 'DESC' },
    });
  }

  async removeMany(entries: HighscoreEntity[]): Promise<number> {
    if (!entries.length) {
      return 0;
    }

    const result = await this.highScoreRepository.remove(entries);
    return result.length;
  }
}
