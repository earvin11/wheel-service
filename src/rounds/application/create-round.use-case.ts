import { Injectable } from '@nestjs/common';
import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { RoundUseCases } from './round.use-cases';
import { EventPublisher } from 'src/events/domain/event-publisher';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { sleep } from 'src/shared/helpers/sleep.helper';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { WheelUseCases } from 'src/wheel/application/wheel.use-cases';

interface ICreateRound {
  ID_Ruleta: string;
  ID_Ronda: string;
  Resultado: string;
  Giro: string;
  Rpm: string;
  Error: string;
  Fecha: string;
}

@Injectable()
export class CreateRoundUseCase {
  constructor(
    private readonly wheelUseCases: WheelUseCases,
    private readonly roundUseCases: RoundUseCases,
    private readonly eventPublisher: EventPublisher,
    private readonly loggerPort: LoggerPort,
  ) {}
  async run(data: ICreateRound) {
    try {
      const { ID_Ruleta, ID_Ronda } = data;

      const roulette = await this.wheelUseCases.findOneBy({
        providerId: ID_Ruleta,
      });
      //TODO: mejorar error de no coincidir con el juego
      if (!roulette) return;

      const result = Number(data.Resultado);
      const possibleResults = [-1, 99];

      //TODO:
      // Evaluar data erronea en los results
      if (!possibleResults.includes(result)) {
        if (this.verifyResult(result)) {
        }
      }

      if (!roulette.active) {
        await this.wheelUseCases.updateOne(roulette.uuid!, {
          active: true,
        });
      }

      //TODO:
      // if (roulette.isManualRoulette) {
      //   //BUSCAR RONDA ACTUAL
      //   const roundExists = await this.roundUseCases.findOneBy({
      //     roulette: roulette.uuid,
      //     result: { $in: possibleResults },
      //     providerId: { $ne: '999' }, // para no tomar en cuenta rondas cerradas
      //   });
      //   if (roundExists)
      //     return {
      //       error: true,
      //       msg: 'Round by roulette opened',
      //       ID_Ronda: roundExists.providerId,
      //     };
      // }

      const round = await this.roundUseCases.create({
        identifierNumber: this.useIndentifierNumber(),
        providerId: ID_Ronda,
        rouletteId: roulette.uuid!,
        rouletteName: roulette.name,
        secondsToAdd: roulette.roundDuration,
      });

      // Publicar ronda para emitir
      this.eventPublisher.emit(EventsEnum.ROUND_START, {
        msg: 'Round opened',
        round: {
          start_date: round.start_date,
          end_date: round.end_date,
          ID_Ronda: data.ID_Ronda,
          identifierNumber: round.identifierNumber,
          round: round.uuid,
          gameId: roulette.uuid,
        },
      });

      this.eventPublisher.emit(EventsEnum.ROUND_TO_CLOSED, {
        roundUuid: round.uuid,
        timeDelay: roulette.roundDuration,
      });

      return;
    } catch (error) {
      this.loggerPort.error('Error in CreateRoundUseCase.run', error.stack);
      throw error;
    }
  }

  private useIndentifierNumber = () => {
    const uuid = generateUuid();
    const numericUuid = uuid.replace(/-/g, '').replace(/[a-f]/gi, (char) => {
      return (char.charCodeAt(0) - 87).toString(); // 'a' -> 10, 'b' -> 11, ..., 'f' -> 15
    });
    const limitedUuid = numericUuid.slice(0, 10);
    return parseInt(limitedUuid, 10);
  };

  private verifyResult = (result: number) => {
    if (result !== 99) {
      if (result < 0 || result > 37) {
        return true;
      }
    }

    return false;
  };
}
