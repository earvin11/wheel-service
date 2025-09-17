import { Injectable } from '@nestjs/common';
import { OperatorLimitsEntity } from '../domain/entites/operator-limits.entity';
import { OperatorLimits } from '../domain/implementations/operator-limits.value';
import { OperatorLimitsRepository } from '../domain/repositories/operator-limits.repsitory';

@Injectable()
export class OperatorLimitsUseCases {
  constructor(
    private readonly operatorLimitRepository: OperatorLimitsRepository,
  ) {}

  public create = async (data: OperatorLimitsEntity) => {
    const oldLimit = await this.operatorLimitRepository.findOneBy({
      operator: data.operator,
      currency: data.currency,
    });
    if (oldLimit) return oldLimit;

    const newData = new OperatorLimits(data);
    return await this.operatorLimitRepository.create(newData);
  };

  public findAll = async (page: number = 1, limit: number = 10) => {
    const data = await this.operatorLimitRepository.findAll(page, limit);
    return data;
  };

  public findById = async (id: string) => {
    const data = await this.operatorLimitRepository.findById(id);
    return data;
  };

  public findOneBy = async (filter: Record<string, any>) => {
    const data = await this.operatorLimitRepository.findOneBy(filter);
    return data;
  };

  public findManyBy = async (filter: Record<string, any>) => {
    const data = await this.operatorLimitRepository.findManyBy(filter);
    return data;
  };

  public update = async (
    id: string,
    dataToUpdate: Partial<OperatorLimitsEntity>,
  ) => {
    const data = await this.operatorLimitRepository.update(id, dataToUpdate);
    return data;
  };

  public findOneByAndUpdate = async (
    filter: Record<string, any>,
    dataToUpdate: Partial<OperatorLimitsEntity>,
  ) => {
    const data = await this.operatorLimitRepository.findOneByAndUpdate(
      filter,
      dataToUpdate,
    );
    return data;
  };

  public remove = async (id: string) => {
    const data = await this.operatorLimitRepository.remove(id);
    return data;
  };

  //TODO: tipar limits
  public updateCurrencyLimits = async (
    operatorId: string,
    rouletteId: string,
    limits: any,
  ) => {
    // const [ operator, roulette ] = await Promise.all([
    //     this.operatorRepository.findById(operatorId),
    //     this.rouletteRepository.findById(rouletteId)
    // ]);
    // if(!operator) throw new NotFoundException('Operator');
    // if(!roulette) throw new NotFoundException('Roulette');
    // const queries = limits.map(async (element) => {
    //     if(element) {
    //         return this.operatorLimitRepository.findOneByAndUpdate(
    //             { operator: operatorId, roulette: rouletteId, currency: element.currency },
    //             { ...element }
    //         )
    //     }
    // });
    // await Promise.all([...queries]);
  };
}
