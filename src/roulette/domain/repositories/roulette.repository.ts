import { RouletteEntity } from '../entites/roulette.entity';

export abstract class RouletteRepository {
  abstract create(data: RouletteEntity): Promise<RouletteEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<RouletteEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<RouletteEntity | null>;
  abstract findByUuid(
    uuid: string,
    populateFields?: string | string[],
  ): Promise<RouletteEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<RouletteEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<RouletteEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<RouletteEntity>,
  ): Promise<RouletteEntity | null>;
  abstract updateByUuid(
    uuid: string,
    data: Partial<RouletteEntity>,
  ): Promise<RouletteEntity | null>;
  abstract remove(id: string): Promise<RouletteEntity | null>;
}
