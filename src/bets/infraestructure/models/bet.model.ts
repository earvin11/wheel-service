import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BetEntity } from 'src/bets/domain/entities/bet.entity';

@Schema()
export class BetModel extends Document implements BetEntity {
  @Prop()
  roundUuid: string;

  @Prop()
  playerUuid: string;

  @Prop()
  gameUuid: string;

  @Prop()
  playerWalletId: string;

  @Prop()
  currency: string;

  @Prop()
  operatorUuid: string;

  @Prop()
  type: string;

  @Prop()
  value: string;

  @Prop()
  amount: number;

  @Prop()
  betReference: string;

  @Prop({ default: false })
  isWinner: boolean;

  @Prop({ default: 0 })
  amountPayout: number;

  @Prop({ index: true, unique: true })
  uuid: string;

  @Prop({ default: Date.now, expires: 90 }) // Expira en 1/2 hora (3600 segundos)
  createdAt: Date;
}

export const BetSchema = SchemaFactory.createForClass(BetModel);
