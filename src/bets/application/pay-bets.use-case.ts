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
    // private readonly roundCacheUseCases: RoundCacheUseCases
  ) {}

  async run(data: { result: number; round: string; rouletteId: string }) {
    const { result, round: roundUuid } = data;
    try {
      const filterWinner = this.createOptionsWinner(result);
      // Obtener todas las apuestas ganadoras de una vez
      const betsWinner = await this.betRepository.findManyBy({
        value: { $in: filterWinner },
        roundUuid,
        amountPayout: 0,
      });

      if (!betsWinner.length) return;

      // Pre-cargar todas las configuraciones de operador necesarias
      const operatorUuids = [
        ...new Set(betsWinner.map((bet: BetEntity) => bet.operatorUuid)),
      ];
      const operatorConfigs = await this.loadOperatorConfigs(operatorUuids);

      // Preparar todas las actualizaciones
      const updateBetsWinner = betsWinner.map(async (currentBet: BetEntity) => {
        const operatorConfig = operatorConfigs.get(currentBet.operatorUuid);
        // TODO: especificar que hacer en caso de no haber un operator config, si lanzar un error o notificar
        if (!operatorConfig) return;

        const amountPayout = parseFloat(
          (+operatorConfig[currentBet.type] * +currentBet.amount).toFixed(2),
        );
        // console.log({ type: currentBet.type, operator: +operatorConfig[currentBet.type], amount: +currentBet.amount });
        // console.log({ amountPayout });

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

  private createOptionsWinner(result: number): string[] {
    // Definimos las constantes como Sets para mejor performance en búsquedas
    const firstColumnNumbers = new Set([
      1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34,
    ]);
    const seccondColumnNumbers = new Set([
      2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35,
    ]);
    const thirdColumnNumbers = new Set([
      3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36,
    ]);
    const redNumbers = new Set([
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ]);
    const specialCalleNumbers = new Set([37, 0, 1, 2, 3]);
    const firstCubreNumbers = new Set([0, 1, 2]);
    const seccondCubreNumbers = new Set([0, 2, 3]);
    const thirdCubreNumbers = new Set([0, 37, 2]);
    const fourhtCubreNumbers = new Set([37, 2, 3]);

    const filterWinner: string[] = [];

    // Verificamos columnas
    if (firstColumnNumbers.has(result)) filterWinner.push('FIRST-COLUMN');
    if (seccondColumnNumbers.has(result)) filterWinner.push('SECOND-COLUMN');
    if (thirdColumnNumbers.has(result)) filterWinner.push('THIRD-COLUMN');

    // Verificamos color
    filterWinner.push(redNumbers.has(result) ? 'RED' : 'BLACK');

    // SpecialCalle
    if (specialCalleNumbers.has(result)) filterWinner.push('37-0-1-2-3');

    // Posibles cubres
    if (firstCubreNumbers.has(result)) filterWinner.push('0-1-2');
    if (seccondCubreNumbers.has(result)) filterWinner.push('0-2-3');
    if (thirdCubreNumbers.has(result)) filterWinner.push('0-37-2');
    if (fourhtCubreNumbers.has(result)) filterWinner.push('37-2-3');

    // Verificamos rangos
    if (result > 0 && result < 19) filterWinner.push('1-18');
    if (result >= 19 && result <= 36) filterWinner.push('19-36');

    // Verificamos docenas
    if (result >= 1 && result <= 12) filterWinner.push('FIRST-DOZEN');
    if (result >= 13 && result <= 24) filterWinner.push('SECCOND-DOZEN');
    if (result >= 25 && result <= 36) filterWinner.push('THIRD-DOZEN');

    // Verificamos paridad (solo si es número válido)
    if (result > 0 && result <= 36) {
      filterWinner.push(result % 2 === 0 ? 'EVEN' : 'ODD');
    }

    // Añadimos el número resultante
    filterWinner.push(String(result));

    return filterWinner;
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
