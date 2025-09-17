import { Injectable } from '@nestjs/common';
import { BetUseCases } from 'src/bets/application/bet.use-cases';
import { RoundUseCases } from 'src/rounds/application';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { Jackpot } from './Jackpot';
import { IConfigJackpot } from './interfaces/IConfigJackpot';
import { EventPublisher } from 'src/events/domain/event-publisher';
import { EventsEnum } from 'src/shared/enums/events.enum';

@Injectable()
export class CreateJackpoUseCase {
  private config: IConfigJackpot = {
    virtualBank_min: 150,
    virtualBank_max: 500,
    virtualBank_part: 18,
    collectionOfMultipliers: [50, 100, 150, 200, 300, 500, 1000],
    sizeJackpots: 5,
    betPrizeMoney: {
      straightUp: 32,
      split: 18,
      street: 12,
      corner: 8,
      line: 6,
      dozen: 3,
      column: 3,
      redBlack: 1,
      evenOdd: 1,
      lowHigh: 1,
      basket: 7,
    },
  };

  constructor(
    private readonly betUseCases: BetUseCases,
    private readonly roundUseCases: RoundUseCases,
    private readonly eventPublisher: EventPublisher,
    private readonly loggerPort: LoggerPort,
  ) {}

  public async run(roundUuid: string) {
    try {
      const round = await this.roundUseCases.findByUuid(roundUuid);
      if (!round) {
        this.loggerPort.error(`Round not found in create jackpot`, roundUuid);
        return;
      }

      const bets = await this.betUseCases.findManyBy({ roundUuid });

      const jackpot = new Jackpot(this.config);

      for (let i = 0; i < bets.length; i++) {
        const currentBet = bets[i];

        switch (currentBet.type) {
          case 'pleno':
            jackpot.betStraight(`${currentBet.value}`, currentBet.amount);
            break;
          case 'semiPleno':
            jackpot.betSplit(+currentBet.value, currentBet.amount);
            break;
          case 'calle':
            jackpot.betStreet(+currentBet.value, currentBet.amount);
            break;
          case 'linea':
            jackpot.betDoubleStreet(+currentBet.value, currentBet.amount);
            break;
          case 'cuadro':
            jackpot.betCorner(+currentBet.value, currentBet.amount);
            break;
          case 'chanceSimple':
            jackpot.betHighLow(
              currentBet.value === '19-36' ? 'high' : 'low',
              currentBet.amount,
            );
            break;
          case 'color':
            jackpot.betColor(
              currentBet.value === 'BLACK' ? 'black' : 'red',
              currentBet.amount,
            );
            break;
          case 'dozens':
            jackpot.betDozen(
              currentBet.value === 'FIRST-DOZEN'
                ? 1
                : currentBet.value === 'SECCOND-DOZEN'
                  ? 2
                  : 3,
              currentBet.amount,
            );
            break;
          case 'evenOdd':
            jackpot.betEvenOdd(
              currentBet.value === 'ODD' ? 'odd' : 'even',
              currentBet.amount,
            );
            break;
          case 'specialCalle':
            jackpot.betBasket(currentBet.amount);
            break;
          case 'column':
            jackpot.betColumn(
              currentBet.value === 'FIRST-COLUMN'
                ? 1
                : currentBet.value === 'SECCOND-COLUMN'
                  ? 2
                  : 3,
              currentBet.amount,
            );
            break;
          case 'cubre':
            break;
          default:
            break;
        }
      }

      const resolve = jackpot.resolve(300);
      const jackpots = resolve.result;
      await this.roundUseCases.updateByUuid(roundUuid, {
        jackpot_values: jackpots,
      });
      const dataToEmit = {
        msg: 'Jackpots',
        round: {
          jackpot_values: jackpots,
          round: round.uuid,
          gameId: round.roulette,
        },
      };
      this.eventPublisher.emit(EventsEnum.EMIT_JACKPOT, dataToEmit);
      return jackpot;
    } catch (error) {
      this.loggerPort.error(
        `Error metodo CreateJackpoUseCase.run`,
        error.stack,
      );
      throw error;
    }
  }
}
