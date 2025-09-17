import { DateServiceUseCases } from 'src/date-service/application/date-service.use-cases';
import { RoundEntity } from '../domain/entities/round.entity';
import { Round } from '../domain/implementations/round.value';
import { RoundRepository } from '../domain/repositories/round.repository';
import { Injectable } from '@nestjs/common';
import { LoggerPort } from 'src/logging/domain/logger.port';

interface ICreateRound {
  rouletteId: string;
  rouletteName: string;
  providerId: string;
  identifierNumber: number;
  secondsToAdd: number;
}

interface ResultItem {
  result: number;
  jackpot: boolean;
  jackpotValues: number[];
  multiplier?: number;
}

@Injectable()
export class RoundUseCases {
  constructor(
    private readonly roundRepository: RoundRepository,
    private readonly dateServiceUseCases: DateServiceUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}

  public create = async (data: ICreateRound) => {
    try {
      const {
        rouletteId,
        rouletteName,
        providerId,
        identifierNumber,
        secondsToAdd,
      } = data;

      const date = this.dateServiceUseCases.getCurrentDate('DD-MM-YYYY');
      const time = this.dateServiceUseCases.getCurrentTime('HH-mm-ss');

      const number = await this.verifyDate(rouletteId);

      const startDate = new Date();
      const futureDate = new Date(startDate.getTime() + secondsToAdd * 1000);
      const newRound = new Round({
        code: `${rouletteName}-${date}-${time}-${number}`,
        end_date: futureDate,
        identifierNumber,
        number,
        open: true,
        providerId,
        roulette: rouletteId,
        result: -1,
        start_date: startDate,
      });
      return await this.roundRepository.create(newRound);
    } catch (error) {
      this.loggerPort.error('Error in RoundUseCases.create', error.stack);
      throw error;
    }
  };

  public findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    try {
      return await this.roundRepository.findAll(skip, limit);
    } catch (error) {
      this.loggerPort.error('Error in RoundUseCases.findAll', error.stack);
      throw error;
    }
  };

  public findByUuid = async (uuid: string) => {
    this.loggerPort.log(uuid);
    try {
      return await this.roundRepository.findByUuid(uuid);
    } catch (error) {
      this.loggerPort.error('Error in RoundUseCases.findByUuid', error.stack);
      throw error;
    }
  };

  public findOneBy = async (filter: Record<string, any>) => {
    try {
      return await this.roundRepository.findOneBy(filter);
    } catch (error) {
      this.loggerPort.error('Error in RoundUseCases.findOneBy', error.stack);
      throw error;
    }
  };

  public updateByUuid = async (uuid: string, data: Partial<RoundEntity>) => {
    try {
      return await this.roundRepository.updateByUuid(uuid, data);
    } catch (error) {
      this.loggerPort.error('Error in RoundUseCases.updateByUuid', error.stack);
      throw error;
    }
  };

  public getLatestResults = async (limit: number) => {
    try {
      const rounds = await this.roundRepository.findManyBy(
        { result: { $nin: [-1, 99] } },
        { $natural: -1 },
        limit,
      );

      // Precalculamos Set sólo cuando haya jackpot_values
      return rounds.map(({ result, jackpot_values }: RoundEntity) => {
        if (!jackpot_values?.length)
          return { result, jackpot: false, jackpotValues: [] };

        // Mapa para búsqueda O(1)
        const jackpotMap = new Map<number, number>(
          jackpot_values.map(({ number, multiplier }) => [number, multiplier]),
        );

        const hit = jackpotMap.get(result);
        return {
          result,
          jackpot: hit !== undefined,
          multiplier: hit,
          jackpotValues: Array.from(jackpotMap.keys()),
        };
      });
    } catch (error) {
      this.loggerPort.error(
        `Error getLatestResults limit: ${limit}`,
        error.stack,
      );
      throw error;
    }
  };

  private verifyDate = async (rouletteId: string) => {
    try {
      const rounds: any[] = await this.roundRepository.findManyBy({
        roulette: rouletteId,
      });

      if (rounds.length) {
        if (rounds.length > 1) {
          const lastRound = String(rounds[rounds.length - 1].createdAt);
          const beforeLastRound = String(rounds[rounds.length - 2].createdAt);
          const lastRoundDay = lastRound.split(' ')[2];
          const beforeLastRoundDay = beforeLastRound.split(' ')[2];

          if (lastRoundDay !== beforeLastRoundDay) return 1;
        }

        return rounds[rounds.length - 1].number
          ? rounds[rounds.length - 1].number + 1
          : 1;
      }

      return 1;
    } catch (error) {
      this.loggerPort.error('Error in RoundUseCases.verifyDate', error.stack);
      throw error;
    }
  };
}
