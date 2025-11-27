import { IsNumber, IsString } from 'class-validator';

export class JoinGame {
  @IsString()
  player: string;

  @IsNumber()
  key: number;
}

export class CreateRoom {
  @IsString()
  player: string;
}
