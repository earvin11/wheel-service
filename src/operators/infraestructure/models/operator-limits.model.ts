import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OperatorLimitsEntity } from 'src/operators/domain/entites/operator-limits.entity';

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
  uuid: string;
}

export const OperatorLimitsSchema =
  SchemaFactory.createForClass(OperatorLimits);
