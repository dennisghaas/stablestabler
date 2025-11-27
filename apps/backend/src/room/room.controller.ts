import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoom, JoinGame } from './dto/room.dto';
import { join } from 'path';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(
    @Body() createRoom: CreateRoom,
  ): Promise<{ id: string; key: string }> {
    return await this.roomService.create(createRoom);
  }

  @Get()
  async findAll() {
    return await this.roomService.find();
  }

  @Post('join/:id')
  async joinGame(@Param('id') id: string, @Body() joinGame: JoinGame) {
    return await this.roomService.joinGame(id, joinGame);
  }
}
