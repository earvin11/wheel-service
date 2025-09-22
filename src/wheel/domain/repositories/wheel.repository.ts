import { WheelEntity } from '../entites/wheel.entity';

export abstract class WheelRepository {
  abstract create(data: WheelEntity): Promise<WheelEntity>;
  abstract findAll(
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<WheelEntity[] | []>;
  abstract findById(
    id: string,
    populateFields?: string | string[],
  ): Promise<WheelEntity | null>;
  abstract findByUuid(
    uuid: string,
    populateFields?: string | string[],
  ): Promise<WheelEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<WheelEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<WheelEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<WheelEntity>,
  ): Promise<WheelEntity | null>;
  abstract updateByUuid(
    uuid: string,
    data: Partial<WheelEntity>,
  ): Promise<WheelEntity | null>;
  abstract remove(id: string): Promise<WheelEntity | null>;
}
