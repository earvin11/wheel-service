import { Injectable } from '@nestjs/common';
import { BetRepository } from '../domain/repositories/bet.repository';

@Injectable()
export class BetUseCases {
  constructor(private readonly betRepository: BetRepository) {}

  public findAll = async (page = 1, limit = 10) => {
    return await this.betRepository.findAll(page, limit);
  };

  public findManyBy = async (filter: Record<string, any>) => {
    return await this.betRepository.findManyBy(filter);
  };
}
