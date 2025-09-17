import { Module } from '@nestjs/common';
import { HistoryPlayerUseCase } from '../application/history-player.use-case';
import { PlayerRoundController } from './controllers/player-round.controller';

@Module({
  providers: [HistoryPlayerUseCase],
  controllers: [PlayerRoundController],
})
export class ReportsModule {}
