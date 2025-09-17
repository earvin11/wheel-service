import { Controller, Get, Query } from '@nestjs/common';
import { HistoryPlayerUseCase } from 'src/reports/application/history-player.use-case';

@Controller('player-round')
export class PlayerRoundController {
  constructor(private readonly historyPlayerUseCase: HistoryPlayerUseCase) {}

  @Get('history')
  async historyPlayer(
    @Query('player') playerId: string,
    @Query('skip') skip: string,
    @Query('limit') limit: string,
  ) {
    return await this.historyPlayerUseCase.run({
      playerId,
      skip: +skip,
      limit: +limit,
    });
  }
}
