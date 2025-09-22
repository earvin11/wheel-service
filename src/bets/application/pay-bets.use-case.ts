import { Injectable } from '@nestjs/common';
import { BetRepository } from '../domain/repositories/bet.repository';
// import { RoundCacheUseCases } from 'src/rounds/application';
import { OperatorConfigUseCases } from 'src/operators/application/operator-config.use-cases';
import { OperatorConfigCacheUseCases } from 'src/operators/application/operator-config-cache.use-cases';
import { getEntityFromCacheOrDb } from 'src/shared/helpers/get-entity-from-cache-or-db.helper';
import { BetEntity } from '../domain/entities/bet.entity';
import { TransactionUseCases } from 'src/transactions/application/transaction.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { CommunicationWalletPort } from 'src/comunication-ms/domain/ports/communication-wallet.port';
import { WheelUseCases } from 'src/wheel/application/wheel.use-cases';
// import { CommunicationReportsPort } from 'src/comunication-ms/domain/ports/communication-reports.port';

@Injectable()
export class PayBetsUseCase {
  constructor(
    private readonly betRepository: BetRepository,
    private readonly operatorConfigUseCases: OperatorConfigUseCases,
    private readonly operatorConfigCacheUseCases: OperatorConfigCacheUseCases,
    private readonly transactionUseCases: TransactionUseCases,
    // private readonly communicationReportsPort: CommunicationReportsPort,
    private readonly communicationWallet: CommunicationWalletPort,
    private readonly loggerPort: LoggerPort,
    private readonly wheelUseCases: WheelUseCases,
    // private readonly roundCacheUseCases: RoundCacheUseCases
  ) {}

  async run(data: { result: number; round: string; gameId: string }) {
    const { result, round: roundUuid } = data;
    try {
      // Obtener todas las apuestas ganadoras de una vez
      const betsWinner = await this.betRepository.findManyBy({
        value: result,
        roundUuid,
        amountPayout: 0,
      });

      if (!betsWinner.length) return;

      // Pre-cargar todas las configuraciones de operador necesarias
      const operatorUuids = [
        ...new Set(betsWinner.map((bet: BetEntity) => bet.operatorUuid)),
      ];
      const operatorConfigs = await this.loadOperatorConfigs(operatorUuids);

      // TODO: cachear response
      const wheel = await this.wheelUseCases.findById(data.gameId);
      if(!wheel) return;

      // Revisar que venga ese pago para ese numero
      const basePay = wheel.betPays!.find((b) => b.number === result)!.multiplier;

      // Preparar todas las actualizaciones
      const updateBetsWinner = betsWinner.map(async (currentBet: BetEntity) => {
        const operatorConfig = operatorConfigs.get(currentBet.operatorUuid);
        // TODO: especificar que hacer en caso de no haber un operator config, si lanzar un error o notificar
        if (!operatorConfig) return;

        const amountPayout = parseFloat(
          // (+operatorConfig[currentBet.type] * +currentBet.amount).toFixed(2),
          (basePay * +currentBet.amount).toFixed(2),
          
        );
        return this.betRepository.updateByUuid(currentBet.uuid!, {
          amountPayout,
          isWinner: true,
        });
      });

      // Ejecutar todas las actualizaciones en paralelo
      await Promise.all(updateBetsWinner);
      // Obtener resultados finales
      const resp =
        await this.betRepository.findBetsWinnerWithEarningsGroupPlayer(
          roundUuid,
        );

      const createTransactions: Promise<any>[] = [];

      for (let i = 0; i < resp.length; i++) {
        const {
          totalWinnings,
          operatorUuid,
          betReference,
          currency,
          gameUuid,
          playerWalletId,
          createdAt,
          betWinCount,
          bets,
        } = resp[i];

        await this.communicationWallet.credit(operatorUuid, {
          amount: totalWinnings,
          bet_code: betReference,
          bet_id: betReference,
          round_id: roundUuid,
          bet_date: createdAt,
          currency,
          game_id: gameUuid,
          platform: '',
          transactionType: 'credit',
          user_id: playerWalletId,
        });

        // await this.communicationReportsPort.create({
        //   amount: totalWinnings,
        //   currency,
        //   gameId: gameUuid,
        //   operatorId: operatorUuid,
        //   platform: '',
        //   roundId: roundUuid,
        //   transactionType: 'win',
        //   userId: playerWalletId,
        // });

        createTransactions.push(
          this.transactionUseCases.create({
            roundUuid,
            amount: totalWinnings || 0,
            playerUuid: resp[i]._id!,
            type: 'CREDIT',
            betReference: betReference,
            operatorUuid: operatorUuid,
            details: {
              roundResult: result,
              betWinCount: betWinCount,
              totalWinnings: totalWinnings,
              ...bets,
            },
          }),
        );
      }

      await Promise.all(createTransactions);
      return resp;
    } catch (error) {
      this.loggerPort.error('Error PayBetsUseCase.run function:', error);
      throw error;
    }
  }

  private async loadOperatorConfigs(
    operatorUuids: string[],
  ): Promise<Map<string, any>> {
    const configMap = new Map();

    await Promise.all(
      operatorUuids.map(async (uuid) => {
        const config = await getEntityFromCacheOrDb(
          () => this.operatorConfigCacheUseCases.findByOperator(uuid),
          () => this.operatorConfigUseCases.findByOperator(uuid),
          (dbOp) => this.operatorConfigCacheUseCases.save(dbOp),
        );
        if (config) configMap.set(uuid, config);
      }),
    );

    return configMap;
  }
}
