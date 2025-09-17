import { TransactionEntity } from '../entities/transaction.entity';

export abstract class TransactionRepository {
  abstract create(data: TransactionEntity): Promise<TransactionEntity>;
  abstract findAll(): Promise<TransactionEntity[] | []>;
  abstract findByUuid(uuid: string): Promise<TransactionEntity | null>;
  abstract findOneBy(
    filter: Record<string, any>,
  ): Promise<TransactionEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
  ): Promise<TransactionEntity[] | []>;
  abstract remove(uuid: string): Promise<void>;

  abstract historyPlayer(data: {
    player: string;
    search?: string;
    start_date?: string;
    end_date?: string;
    skip?: number;
    limit?: number;
  }): Promise<any>;
}
