import { GameMode, Team } from '../../../../../types/enums/highscore.enum.ts';

export type HighscoreType = {
  id: string;
  player: string;
  score: number;
  team: Team;
  createdAt: Date;
};

export type CreateScore = {
  player: string;
  score: number;
  mode: GameMode;
  team: Team;
};
