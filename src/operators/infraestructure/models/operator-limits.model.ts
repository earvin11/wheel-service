import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  LimitBet,
  OperatorLimitsEntity,
} from 'src/operators/domain/entites/operator-limits.entity';

@Schema()
export class OperatorLimits extends Document implements OperatorLimitsEntity {
  @Prop()
  currency: string;
  @Prop()
  operator: string;
  @Prop()
  short: string;
  @Prop()
  minBet: number;
  @Prop()
  maxBet: number;
  @Prop()
  maxBetPosition: number;
  @Prop()
  uuid: string;
  @Prop({ type: Object })
  pleno: LimitBet;
  @Prop({ type: Object })
  semipleno: LimitBet;
  @Prop({ type: Object })
  cuadro: LimitBet;
  @Prop({ type: Object })
  calle: LimitBet;
  @Prop({ type: Object })
  linea: LimitBet;
  @Prop({ type: Object })
  columna: LimitBet;
  @Prop({ type: Object })
  docena: LimitBet;
  @Prop({ type: Object })
  cubre: LimitBet;
  @Prop({ type: Object })
  chanceSimple: LimitBet;
  @Prop({ type: Object })
  even_odd: LimitBet;
  @Prop({ type: Object })
  color: LimitBet;
  @Prop({ type: Object })
  specialCalle: LimitBet;
}

export const OperatorLimitsSchema =
  SchemaFactory.createForClass(OperatorLimits);
