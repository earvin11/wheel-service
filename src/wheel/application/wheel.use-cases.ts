import { Injectable } from '@nestjs/common';
import { WheelEntity } from '../domain/entites/wheel.entity';
import { Wheel } from '../domain/implementations/wheel.value';
import { WheelRepository } from '../domain/repositories/wheel.repository';
import { LoggerPort } from 'src/logging/domain/logger.port';

@Injectable()
export class WheelUseCases {
  constructor(
    private readonly wheelRepository: WheelRepository,
    private readonly loggerPort: LoggerPort,
  ) {}

  public create = async (data: WheelEntity) => {
    try {
      const rouletteExists = await this.wheelRepository.findOneBy({});
      if (rouletteExists) return rouletteExists;

      const newData = new Wheel(data);
      return await this.wheelRepository.create(newData);
    } catch (error) {
      this.loggerPort.error('Error in WheelUseCases.create', error.stack);
      throw error;
    }
  };

  public findAll = async (
    page: number = 1,
    limit: number = 10,
    populateFields?: string | string[],
  ) => {
    try {
      const data = await this.wheelRepository.findAll(
        page,
        limit,
        populateFields,
      );
      return data;
    } catch (error) {
      this.loggerPort.error('Error in WheelUseCases.findAll', error.stack);
      throw error;
    }
  };

  public findById = async (id: string, populateFields?: string | string[]) => {
    try {
      const data = await this.wheelRepository.findById(id, populateFields);
      return data;
    } catch (error) {
      this.loggerPort.error('Error in WheelUseCases.findById', error.stack);
      throw error;
    }
  };

  public findByUuid = async (
    uuid: string,
    populateFields?: string | string[],
  ) => {
    try {
      return await this.wheelRepository.findByUuid(uuid, populateFields);
    } catch (error) {
      this.loggerPort.error('Error in WheelUseCases.findByUuid', error.stack);
      throw error;
    }
  };

  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    try {
      const data = await this.wheelRepository.findOneBy(filter, populateFields);
      return data;
    } catch (error) {
      this.loggerPort.error('Error in WheelUseCases.findOneBy', error.stack);
      throw error;
    }
  };

  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ) => {
    try {
      const data = await this.wheelRepository.findManyBy(
        filter,
        populateFields,
      );
      return data;
    } catch (error) {
      this.loggerPort.error('Error in WheelUseCases.findManyBy', error.stack);
      throw error;
    }
  };

  public update = async (id: string, dataToUpdate: Partial<WheelEntity>) => {
    try {
      const data = await this.wheelRepository.update(id, dataToUpdate);
      return data;
    } catch (error) {
      this.loggerPort.error('Error in WheelUseCases.update', error.stack);
      throw error;
    }
  };

  public updateOne = async (
    uuid: string,
    dataToUpdate: Partial<WheelEntity>,
  ) => {
    try {
      const data = await this.wheelRepository.updateByUuid(uuid, dataToUpdate);
      return data;
    } catch (error) {
      this.loggerPort.error('Error in WheelUseCases.updateOne', error.stack);
      throw error;
    }
  };

  public remove = async (id: string) => {
    try {
      const data = await this.wheelRepository.remove(id);
      return data;
    } catch (error) {
      this.loggerPort.error('Error in WheelUseCases.remove', error.stack);
      throw error;
    }
  };
}
