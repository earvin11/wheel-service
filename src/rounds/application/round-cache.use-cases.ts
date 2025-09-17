import { Injectable } from '@nestjs/common';
import { RoundCacheRepository } from '../domain/repositories/round-cache.repository';
import { RoundEntity } from '../domain/entities/round.entity';

@Injectable()
export class RoundCacheUseCases {
  constructor(private readonly roundCacheRepository: RoundCacheRepository) {}

  public save = async (data: RoundEntity) => {
    return await this.roundCacheRepository.save(data);
  };

  public findByUuid = async (roundUuid: string) => {
    return await this.roundCacheRepository.findByUuid(roundUuid);
  };

  public remove = async (roundUuid: string) => {
    return await this.roundCacheRepository.delete(roundUuid);
  };

  public saveHotCold = async (limit: string, data: Record<string, any>) => {
    return await this.roundCacheRepository.saveHotColdNumbers(limit, data);
  };

  public findHotCold = async (limit: string) => {
    return await this.roundCacheRepository.findHotColdNumbers(limit);
  };
}
