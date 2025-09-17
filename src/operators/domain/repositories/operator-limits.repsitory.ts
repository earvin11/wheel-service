import { OperatorLimitsEntity } from '../entites/operator-limits.entity';

export abstract class OperatorLimitsRepository {
  abstract create(data: OperatorLimitsEntity): Promise<OperatorLimitsEntity>;
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<OperatorLimitsEntity[] | []>;
  abstract findById(id: string): Promise<OperatorLimitsEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
  ): Promise<OperatorLimitsEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
  ): Promise<OperatorLimitsEntity[] | []>;
  abstract update(
    id: string,
    data: Partial<OperatorLimitsEntity>,
  ): Promise<OperatorLimitsEntity | null>;
  abstract findOneByAndUpdate(
    filter: Record<string, any>,
    data: Partial<OperatorLimitsEntity>,
  ): Promise<OperatorLimitsEntity | null>;
  abstract remove(id: string): Promise<OperatorLimitsEntity | null>;
}
