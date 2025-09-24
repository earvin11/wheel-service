import { Injectable } from '@nestjs/common';
import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { RoundUseCases } from './round.use-cases';
import { EventPublisher } from 'src/events/domain/event-publisher';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { sleep } from 'src/shared/helpers/sleep.helper';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { WheelUseCases } from 'src/wheel/application/wheel.use-cases';
import { RoundEntity } from '../domain/entities/round.entity';

interface ICreateRound {
  providerId: string;
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
      const { providerId } = data;

      const game = await this.wheelUseCases.findOneBy({
        providerId,
      });
      //TODO: mejorar error de no coincidir con el juego
      if (!game) return;

      const lastRound = await this.roundUseCases.findOneBy({ providerId });

      if (lastRound) {
        this.loggerPort.error(
          'Ya existe una ronda en curso para:',
          JSON.stringify({
            ...data,
            id: lastRound.uuid,
          }),
        );
        return {
          ID_Ronda: lastRound.uuid,
          BET_TIME: game.betTime,
        };
      }

      const { providerId: providerGameId, uuid, betTime } = game;
      let seccondsToAdd = betTime;
      const oldRound = await this.roundUseCases.getLatestResults(1);
      const futureDate = new Date(new Date().getTime() + seccondsToAdd * 1000);
      const identifierNumber = this.useIndentifierNumber(
        oldRound[0]!,
        providerGameId,
      );

      const round = await this.roundUseCases.create({
        identifierNumber,
        providerId: providerGameId,
        gameUuid: game.uuid!,
        start_date: new Date(),
        end_date: futureDate,
      });

      const chanellSocket = providerGameId;

      // Publicar ronda para emitir
      this.eventPublisher.emit(EventsEnum.ROUND_START, {
        msg: 'Round opened',
        round: {
          start_date: round.start_date,
          end_date: round.end_date,
          ID_Ronda: round.uuid,
          identifierNumber: round.identifierNumber,
          round: round.uuid,
          gameId: game.uuid,
        },
      });

      this.eventPublisher.emit(EventsEnum.ROUND_TO_CLOSED, {
        roundUuid: round.uuid,
        timeDelay: game.roundDuration,
      });
    } catch (error) {
      this.loggerPort.error('Error in CreateRoundUseCase.run', error.stack);
      throw error;
    }
  }

  private useIndentifierNumber = (lastRound: any, ID_GAME: string) => {
    const identifierNumber = lastRound?.identifierNumber || `${1}${ID_GAME}`;

    const formatId = this.returnNumberWithoutId(identifierNumber, ID_GAME);
    const number = `${formatId + 1}${ID_GAME}`;
    return number;
  };

  private returnNumberWithoutId = (numero: number | string, id: string) => {
    const numerToString = numero.toString();
    const numberWithoutId = numerToString.slice(
      0,
      numerToString.length - id.length,
    );
    return Number(numberWithoutId);
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
