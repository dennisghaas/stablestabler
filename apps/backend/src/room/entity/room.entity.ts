import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../../../../types/enums/highscore.enum';
import { RoomState } from '../enum/room.enum';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: number;

  @Column({ type: 'jsonb', nullable: true })
  players: { player: string; score?: number; team: Team }[];

  @Column({
    type: 'enum',
    enum: RoomState,
    default: RoomState.LOBBY,
  })
  state: RoomState;

  @Column({ nullable: true })
  socketId: string;

  @CreateDateColumn()
  createdAt: Date;

  /*
  one to one zu socket id
  * */
}
