import { Injectable } from '@nestjs/common';
import { BetEntity } from '../domain/entities/bet.entity';
import { Bet } from '../domain/implementations/bet.value';
import { BetRepository } from '../domain/repositories/bet.repository';
import {
  BetInputInterface,
  NumberBet,
  Bet as BetBody,
} from 'src/shared/interfaces/bet-input.interface';
import { BetsTypesEnum } from 'src/shared/enums/bets.enum';
import { TransactionUseCases } from 'src/transactions/application/transaction.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { EventPublisher } from 'src/events/domain/event-publisher';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { CommunicationWalletPort } from 'src/comunication-ms/domain/ports/communication-wallet.port';
// import { CommunicationReportsPort } from 'src/comunication-ms/domain/ports/communication-reports.port';

@Injectable()
export class CreateBetsUseCase {
  constructor(
    private readonly betRepository: BetRepository,
    private readonly transactionUseCases: TransactionUseCases,
    private readonly eventPublisher: EventPublisher,
    // private readonly communicationReportsPort: CommunicationReportsPort,
    private readonly communicationWallet: CommunicationWalletPort,
    private readonly loggerPort: LoggerPort,
  ) {}

  public create = async (data: BetEntity) => {
    try {
      const newData = new Bet(data);
      return await this.betRepository.create(newData);
    } catch (error) {
      this.loggerPort.error(`Error metodo CreateBetsUseCase.create`, error);
      throw error;
    }
  };

  public createMany = async (data: BetEntity[]) => {
    try {
      const newData = data.map((bet) => {
        return new Bet(bet);
      });

      return await this.betRepository.createMany(newData);
    } catch (error) {
      this.loggerPort.error(`Error metodo CreateBetsUseCase.createMany`, error);
      throw error;
    }
  };

  public processBet = async (data: BetInputInterface) => {
    try {
      const {
        calleNumbers = [],
        chanceSimple = [],
        color = [],
        columns = [],
        cuadroNumbers = [],
        cubre = [],
        dozens = [],
        even_odd = [],
        lineaNumbers = [],
        plenoNumbers = [],
        semiPlenoNumbers = [],
        specialCalle = [],
      } = data.bet;

      const betReference = generateUuid();
      const bets: BetEntity[] = [];

      // Mapeo de propiedades y tipos
      const betMappings = [
        { items: calleNumbers, type: 'calle', key: 'number' },
        { items: chanceSimple, type: 'chanceSimple', key: 'type' },
        { items: color, type: 'color', key: 'type' },
        { items: columns, type: 'column', key: 'type' },
        { items: cuadroNumbers, type: 'cuadro', key: 'number' },
        { items: cubre, type: 'cubre', key: 'type' },
        { items: dozens, type: 'dozens', key: 'type' },
        { items: even_odd, type: 'evenOdd', key: 'type' },
        { items: lineaNumbers, type: 'linea', key: 'number' },
        { items: plenoNumbers, type: 'pleno', key: 'number' },
        { items: semiPlenoNumbers, type: 'semiPleno', key: 'number' },
        { items: specialCalle, type: 'specialCalle', key: 'type' },
      ];

      // Generación dinámica de apuestas
      for (const { items, type, key } of betMappings) {
        if (!Array.isArray(items) || !items.length) continue;

        for (const betItem of items) {
          const { amount } = betItem;
          const value = betItem[key];
          bets.push({
            amount,
            value:
              type === 'dozens'
                ? `${value}-DOZEN`
                : type === 'column'
                  ? `${value}-COLUMN`
                  : value,
            gameUuid: data.roulette,
            playerUuid: data.player,
            roundUuid: data.round,
            operatorUuid: data.operatorId,
            currency: data.currency,
            playerWalletId: data.user_id,
            type,
            betReference,
          });
        }
      }

      const totalAmount = this.calculateTotalAmount(data.bet);

      // Registra las apuestas en DB
      await this.createMany(bets);
      // Envia el debito a wallet
      const respWallet = await this.communicationWallet.debit(data.operatorId, {
        amount: totalAmount,
        bet_code: betReference,
        bet_date: new Date(),
        bet_id: betReference,
        currency: data.currency,
        game_id: data.roulette,
        round_id: data.round,
        transactionType: 'bet',
        platform: 'platform',
        user_id: data.user_id,
      });
      //Si todo sale bien crea la transaction
      await this.transactionUseCases.create({
        roundUuid: data.round,
        amount: totalAmount,
        playerUuid: data.player,
        type: 'DEBIT',
        details: data.bet,
        betReference,
        operatorUuid: data.operatorId,
      });

      // await this.communicationReportsPort.create({
      //   amount: totalAmount,
      //   currency: data.currency,
      //   gameId: data.roulette,
      //   operatorId: data.operatorId,
      //   platform: 'desktop',
      //   roundId: data.round,
      //   transactionType: 'bet',
      //   userId: data.player,
      // });

      this.eventPublisher.emit(EventsEnum.BET_SUCCESS, {
        msg: 'Success',
        userBalance: +respWallet.lastBalance,
      });
      return;
    } catch (error) {
      this.eventPublisher.emit(EventsEnum.BET_ERROR, {
        msg: 'Internal server error',
      });
      this.loggerPort.error(
        `Error registrando apuesta metodo CreateBetsUseCase.processBet`,
        error,
      );
      throw error;
    }
  };

  private calculateTotalAmount(bet: BetBody): number {
    let totalAmountInBet: number = 0;

    Object.keys(bet).forEach((keyBet) => {
      switch (keyBet) {
        case BetsTypesEnum.SEMI_PLENO: {
          const amount = this.calculateAmountNumbers(
            bet[BetsTypesEnum.SEMI_PLENO],
            2,
          );
          totalAmountInBet += amount;
          break;
        }
        case BetsTypesEnum.CALLE: {
          const amount = this.calculateAmountNumbers(
            bet[BetsTypesEnum.CALLE],
            3,
          );
          totalAmountInBet += amount;
          break;
        }
        case BetsTypesEnum.CUADRO: {
          const amount = this.calculateAmountNumbers(
            bet[BetsTypesEnum.CUADRO],
            4,
          );
          totalAmountInBet += amount;
          break;
        }
        case BetsTypesEnum.LINEA: {
          const amount = this.calculateAmountNumbers(
            bet[BetsTypesEnum.LINEA],
            6,
          );
          totalAmountInBet += amount;
          break;
        }

        default: {
          const currentBetArr = bet[keyBet];
          currentBetArr.forEach(({ amount }) => {
            totalAmountInBet += amount;
          });
        }
      }
    });
    return parseFloat(totalAmountInBet.toFixed(2));
  }
  private calculateAmountNumbers = (
    numbers: NumberBet[],
    iteratorNumber: number,
  ) => {
    let amount = 0;
    for (let i = 0; i <= numbers.length - iteratorNumber; i += iteratorNumber) {
      const currentBet = numbers[i];
      amount += currentBet.amount;
    }
    return amount;
  };
}
