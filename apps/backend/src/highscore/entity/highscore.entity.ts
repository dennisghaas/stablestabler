import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameMode, Team } from '../../../../../types/enums/highscore.enum';

@Entity()
export class HighscoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  player: string;

  @Column()
  score: number;

  @Column({
    type: 'enum',
    enum: GameMode,
    default: GameMode.SINGLE,
  })
  mode: GameMode;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Team,
    default: Team.RED,
  })
  team: Team | null;

  @CreateDateColumn()
  createdAt: Date;
}
