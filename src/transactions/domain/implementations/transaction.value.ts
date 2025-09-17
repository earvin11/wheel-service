import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import {
  TransactionEntity,
  TypeTransaction,
} from '../entities/transaction.entity';

export class Transaction implements TransactionEntity {
  public type: TypeTransaction;
  public roundUuid: string;
  public playerUuid: string;
  public amount: number;
  public betReference: string;
  public uuid: string;
  public operatorUuid: string;
  public details?: Record<string, any>;

  constructor(data: TransactionEntity) {
    this.amount = data.amount;
    this.details = data.details;
    this.playerUuid = data.playerUuid;
    this.roundUuid = data.roundUuid;
    this.betReference = data.betReference;
    this.type = data.type;
    this.operatorUuid = data.operatorUuid;
    this.uuid = generateUuid();
  }
}
