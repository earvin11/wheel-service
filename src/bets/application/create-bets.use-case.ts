import { Injectable } from '@nestjs/common';
import { BetEntity } from '../domain/entities/bet.entity';
import { Bet } from '../domain/implementations/bet.value';
import { BetRepository } from '../domain/repositories/bet.repository';
import {
  BetInputInterface,
  Bet as BetBody,
} from 'src/shared/interfaces/bet-input.interface';
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
      const betReference = generateUuid();
      const bets: BetEntity[] = [];

      for (const optionBet of data.bet) {
        const { amount, number } = optionBet;

        bets.push({
          amount,
          betReference,
          currency: data.currency,
          gameUuid: data.gameId,
          operatorUuid: data.operatorId,
          playerUuid: data.player,
          playerWalletId: data.user_id,
          roundUuid: data.round,
          value: number,
        })
      }

      const totalAmount = this.calculateAmountBet(data.bet);

      // Registra las apuestas en DB
      await this.createMany(bets);
      // Envia el debito a wallet
      const respWallet = await this.communicationWallet.debit(data.operatorId, {
        amount: totalAmount,
        bet_code: betReference,
        bet_date: new Date(),
        bet_id: betReference,
        currency: data.currency,
        game_id: data.gameId,
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

  private calculateAmountBet = (bet: BetBody[]): number => {
    let totalAmount: number = 0;
    bet.forEach((betBody) => {
      totalAmount += betBody.amount;
    });
    return totalAmount;
  };
}
