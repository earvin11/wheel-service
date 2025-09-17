import { RoundEntity } from '../entities/round.entity';

export abstract class RoundRepository {
  abstract create(data: RoundEntity): Promise<RoundEntity>;
  abstract findAll(page: number, limit: number): Promise<RoundEntity[] | []>;
  abstract findById(id: string): Promise<RoundEntity | null>;
  abstract findByUuid(uuid: string): Promise<RoundEntity | null>;
  abstract findOneBy(filter: Record<string, any>): Promise<RoundEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    sort?: Record<string, 1 | -1>,
    limit?: number,
  ): Promise<RoundEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<RoundEntity>,
  ): Promise<RoundEntity | null>;
  abstract updateByUuid(
    uuid: string,
    data: Partial<RoundEntity>,
  ): Promise<RoundEntity | null>;
  abstract remove(id: string): Promise<RoundEntity | null>;
  abstract findFilteredRounds(
    filter: Record<string, any>,
    page: number,
    limit: number,
  ): Promise<{ rounds: RoundEntity[]; total: number }>;
  abstract findByIdNumber(
    identifierNumber: string,
  ): Promise<RoundEntity[] | []>;
  abstract findByIdNumberWithCountBets(
    identifierNumber: string,
  ): Promise<{ round: RoundEntity; totalBets: number }[] | []>;
}
