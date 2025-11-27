import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinGame {
  @ApiProperty({
    example: 'Alice',
    description: 'Name of the player joining the game',
  })
  @IsString()
  player: string;

  @ApiProperty({
    example: 1234,
    description: 'Secret join key of the room',
  })
  @IsNumber()
  key: number;
}

export class CreateRoom {
  @ApiProperty({
    example: 'Alice',
    description: 'Name of the first player creating the room',
  })
  @IsString()
  player: string;
}
