import { Injectable } from '@nestjs/common';
import { RouletteEntity } from '../domain/entites/roulette.entity';
import { Roulette } from '../domain/implementations/roulette.value';
import { RouletteRepository } from '../domain/repositories/roulette.repository';
import { LoggerPort } from 'src/logging/domain/logger.port';

@Injectable()
export class RouletteUseCases {
  constructor(
    private readonly rouletteRepository: RouletteRepository,
    private readonly loggerPort: LoggerPort,
  ) {}

  public create = async (data: RouletteEntity) => {
    try {
      const rouletteExists = await this.rouletteRepository.findOneBy({});
      if (rouletteExists) return rouletteExists;

      const newData = new Roulette(data);
      return await this.rouletteRepository.create(newData);
    } catch (error) {
      this.loggerPort.error('Error in RouletteUseCases.create', error.stack);
      throw error;
    }
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    try {
      const data = await this.rouletteRepository.findAll(
        page,
        limit,
        populateFields,
      );
      return data;
    } catch (error) {
      this.loggerPort.error('Error in RouletteUseCases.findAll', error.stack);
      throw error;
    }
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    try {
      const data = await this.rouletteRepository.findById(id, populateFields);
      return data;
    } catch (error) {
      this.loggerPort.error('Error in RouletteUseCases.findById', error.stack);
      throw error;
    }
  };

  public findByUuid = async (
    uuid: string,
    populateFields?: string | string[],
  ) => {
    try {
      return await this.rouletteRepository.findByUuid(uuid, populateFields);
    } catch (error) {
      this.loggerPort.error(
        'Error in RouletteUseCases.findByUuid',
        error.stack,
      );
      throw error;
    }
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    try {
      const data = await this.rouletteRepository.findOneBy(
        filter,
        populateFields,
      );
      return data;
    } catch (error) {
      this.loggerPort.error('Error in RouletteUseCases.findOneBy', error.stack);
      throw error;
    }
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    try {
      const data = await this.rouletteRepository.findManyBy(
        filter,
        populateFields,
      );
      return data;
    } catch (error) {
      this.loggerPort.error(
        'Error in RouletteUseCases.findManyBy',
        error.stack,
      );
      throw error;
    }
  };

  public update = async (id: string, dataToUpdate: Partial<RouletteEntity>) => {
    try {
      const data = await this.rouletteRepository.update(id, dataToUpdate);
      return data;
    } catch (error) {
      this.loggerPort.error('Error in RouletteUseCases.update', error.stack);
      throw error;
    }
  };

  public updateOne = async (
    uuid: string,
    dataToUpdate: Partial<RouletteEntity>,
  ) => {
    try {
      const data = await this.rouletteRepository.updateByUuid(
        uuid,
        dataToUpdate,
      );
      return data;
    } catch (error) {
      this.loggerPort.error('Error in RouletteUseCases.updateOne', error.stack);
      throw error;
    }
  };

  public remove = async (id: string) => {
    try {
      const data = await this.rouletteRepository.remove(id);
      return data;
    } catch (error) {
      this.loggerPort.error('Error in RouletteUseCases.remove', error.stack);
      throw error;
    }
  };
}
