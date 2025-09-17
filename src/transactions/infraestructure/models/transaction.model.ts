import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  TransactionEntity,
  TypeTransaction,
} from 'src/transactions/domain/entities/transaction.entity';

@Schema()
export class TransactionModel extends Document implements TransactionEntity {
  @Prop()
  roundUuid: string;

  @Prop()
  playerUuid: string;

  @Prop()
  operatorUuid: string;

  @Prop()
  type: TypeTransaction;

  @Prop()
  amount: number;

  @Prop()
  betReference: string;

  @Prop({ type: Object })
  details?: Record<string, any>;

  @Prop({ index: true, unique: true })
  uuid: string;

  @Prop({ default: Date.now }) // Expira en 1/2 hora (3600 segundos)
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionModel);
