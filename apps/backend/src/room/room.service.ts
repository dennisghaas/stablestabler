import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from './entity/room.entity';
import { RoomState } from './enum/room.enum';
import * as _ from 'lodash';
import { CreateRoom, JoinGame } from './dto/room.dto';
import { Team } from '../../../../types/enums/highscore.enum';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomEntityRepository: Repository<RoomEntity>,
  ) {}

  async create(createRoom: CreateRoom): Promise<{ id: string; key: string }> {
    const key = Math.floor(10000000 + Math.random() * 90000000);
    const payload: Partial<RoomEntity> = {
      key,
      players: [
        {
          player: createRoom.player,
          team: Team.RED,
        },
      ],
      state: RoomState.LOBBY,
    };

    const save = await this.roomEntityRepository.save({
      ...payload,
    });

    if (!save) {
      throw new ConflictException('Room could not created');
    }

    return {
      id: save.id,
      key: _.toString(save.key),
    };
  }

  async joinGame(id: string, joinGame: JoinGame) {
    const room = await this.roomEntityRepository.findOne({
      where: {
        id,
        key: _.toNumber(joinGame.key),
      },
    });

    if (!room) {
      throw new NotFoundException('Room or key are invalid');
    }

    const players = room.players ?? [];
    const assignedTeam = this.getNextAvailableTeam(players);
    const currentPlayers = room.players;

    const payload: Partial<RoomEntity> = {
      ...room,
      players: [
        ...currentPlayers,
        {
          player: joinGame.player,
          team: assignedTeam,
        },
      ],
    };

    if (room.players.length === 4) {
      throw new ConflictException('Maximum player reached');
    }

    const update = await this.roomEntityRepository.update(room.id, payload);
    if (!update) {
      throw new ConflictException('Cant join room');
    }

    return {
      message: 'You can entered the room',
    };
  }

  async find() {
    return await this.roomEntityRepository.find();
  }

  private getNextAvailableTeam(
    players: { player: string; team?: Team }[],
  ): Team {
    const order = [Team.RED, Team.BLUE, Team.GREEN, Team.YELLOW];

    const used = players.filter((p) => p.team).map((p) => p.team as Team);
    return order.find((team) => !used.includes(team))!;
  }
}
