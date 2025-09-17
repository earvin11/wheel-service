import { RouletteUseCases } from 'src/roulette/application/roulette.use-cases';
import { RoundUseCases } from './round.use-cases';
import { EventPublisher } from 'src/events/domain/event-publisher';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { Injectable } from '@nestjs/common';
import { LoggerPort } from 'src/logging/domain/logger.port';

export interface IEndRound {
  ID_Ruleta: string;
  ID_Ronda: string;
  Resultado: string;
  Giro: string;
  Rpm: string;
  Error: string;
  Fecha: string;
}

@Injectable()
export class EndRoundUseCase {
  constructor(
    private readonly roundUseCases: RoundUseCases,
    private readonly rouletteUseCases: RouletteUseCases,
    private readonly eventPublisher: EventPublisher,
    private readonly loggerPort: LoggerPort,
  ) {}
  async run(data: any) {
    try {
      const providerId = Number(data.ID_Ronda) - 1;
      const round = await this.roundUseCases.findOneBy({
        providerId: String(providerId),
      });

      if (!round) {
        this.loggerPort.error('Error buscando ronda', data.ID_Ronda);
        return {
          error: true,
          message: 'Error round no encontrado',
          ID_Ronda: data.ID_Ronda,
        };
      }

      const roulette = await this.rouletteUseCases.findOneBy({
        providerId: data.ID_Ruleta,
      });
      if (!roulette)
        return {
          error: true,
          message: 'Error roulette not found',
          providerId: data.ID_Ruleta,
        };

      const result = +data.Resultado;

      if (result >= 0 && result <= 37) {
        await this.roundUseCases.updateByUuid(round.uuid!, {
          result: result,
          providerId: '999',
        });
      }

      this.eventPublisher.emit(EventsEnum.ROUND_END, {
        msg: 'Round closed',
        round: {
          result,
          round: round.uuid,
          gameId: roulette.uuid,
        },
      });

      return;
    } catch (error) {
      this.loggerPort.error('Error in EndRoundUseCase', error.stack);
      throw error;
    }
  }
}
