import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoom, JoinGame } from './dto/room.dto';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiBody({
    type: CreateRoom,
    description: 'Creates a new game room',
  })
  @ApiResponse({
    status: 201,
    description: 'Room successfully created',
    schema: {
      example: {
        id: 'abc123',
        key: '5678',
      },
    },
  })
  async createRoom(
    @Body() createRoom: CreateRoom,
  ): Promise<{ id: string; key: string }> {
    return await this.roomService.create(createRoom);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all existing rooms',
    schema: {
      example: [
        {
          id: 'abc123',
          players: ['Alice'],
        },
        {
          id: 'xyz789',
          players: ['Bob', 'Eve'],
        },
      ],
    },
  })
  async findAll() {
    return await this.roomService.find();
  }

  @Post('join/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the room the player wants to join',
    example: 'abc123',
  })
  @ApiBody({
    type: JoinGame,
    description: 'Player and key required to join a room',
  })
  @ApiResponse({
    status: 200,
    description: 'Player successfully joined the room',
  })
  async joinGame(@Param('id') id: string, @Body() joinGame: JoinGame) {
    return await this.roomService.joinGame(id, joinGame);
  }
}
