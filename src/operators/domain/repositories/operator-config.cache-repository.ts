import { OperatorConfigEntity } from '../entites/operator-config.entity';

export abstract class OperatorConfigCacheRepository {
  abstract save(data: OperatorConfigEntity): Promise<string>;
  abstract findByOperator(operatorId: string): Promise<string | null>;
  abstract remove(operatorId: string): Promise<void>;
}
