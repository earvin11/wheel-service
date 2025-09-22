import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BetPay, WheelEntity } from 'src/wheel/domain/entites/wheel.entity';

@Schema()
export class Wheel extends Document implements WheelEntity {
  @Prop()
  name: string;

  @Prop()
  providerId: string;

  @Prop()
  roundDuration: number;

  @Prop()
  urlTransmision: string;

  @Prop()
  openingTime: string;

  @Prop()
  closingTime: string;

  @Prop()
  imgBackground: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  manualDisable?: boolean;

  @Prop({ default: false })
  jackpot: boolean;

  @Prop({ unique: true, index: true })
  uuid: string;

  @Prop()
  percentReturnToPlayer: number;

  @Prop()
  bank: number;

  @Prop()
  startRoundTime: number;

  @Prop({ type: Object })
  betPays: BetPay[];

  @Prop()
  alwaysOpen?: boolean;

  @Prop()
  maxBetFigures: number;

  @Prop()
  betTime: number;

  @Prop({ default: 'WHEEL' })
  type?: string;
}

export const WheelSchema = SchemaFactory.createForClass(Wheel);
