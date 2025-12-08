import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { HighscoreService } from './highscore.service';
import { CreateHighScore } from './dto/highscore.dto';
import { GameMode } from '../../../../types/enums/highscore.enum';
import { isValidEnum } from '../helper';

@ApiTags('Highscore')
@Controller('highscore')
export class HighscoreController {
  constructor(private readonly highScoreService: HighscoreService) {}
  @Post()
  @ApiBody({
    type: CreateHighScore,
    description: 'Create a new high score entry',
  })
  @ApiCreatedResponse({
    description: 'Highscore successfully created',
  })
  async createHighScore(@Body() createHighScore: CreateHighScore) {
    return await this.highScoreService.create(createHighScore);
  }

  @Get()
  @ApiQuery({
    name: 'mode',
    enum: GameMode,
    description: 'Game mode to filter highscores by',
    example: GameMode.SINGLE,
  })
  @ApiOkResponse({
    description: 'Returns all highscores for the given mode',
  })
  @ApiBadRequestResponse({
    description: 'If mode is not a valid GameMode enum value',
  })
  async findHighScores(@Query('mode') mode: GameMode) {
    if (!isValidEnum(mode, GameMode)) {
      throw new BadRequestException(`Mode "${mode}" does not exist`);
    }

    return await this.highScoreService.findByMode(mode);
  }
}
