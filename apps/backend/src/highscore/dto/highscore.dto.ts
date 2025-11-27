import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GameMode, Team } from '../enums/highscore.enum';

export class CreateHighScore {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the player',
  })
  @IsString()
  player: string;

  @ApiProperty({
    example: 42,
    description: 'Final score the player achieved',
  })
  @IsNumber()
  score: number;

  @ApiProperty({
    enum: GameMode,
    example: GameMode.SINGLE,
    description: 'Game mode for this high score',
  })
  @IsEnum(GameMode)
  mode: GameMode;

  @ApiProperty({
    enum: Team,
    example: Team.RED,
    required: false,
    description: 'Team color (only relevant in multiplayer mode)',
  })
  @IsOptional()
  @IsEnum(Team)
  team?: Team;
}
