import { OperatorConfigEntity } from '../entites/operator-config.entity';

export abstract class OperatorConfigRepository {
  abstract create(data: OperatorConfigEntity): Promise<OperatorConfigEntity>;
  abstract findAll(): Promise<OperatorConfigEntity[] | []>;
  abstract findByOperator(
    operatorId: string,
  ): Promise<OperatorConfigEntity | null>;
  abstract updateByOperator(
    operatorId: string,
    data: Partial<OperatorConfigEntity>,
  ): Promise<OperatorConfigEntity | null>;
}
