import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OperatorConfigEntity } from 'src/operators/domain/entites/operator-config.entity';

@Schema()
export class OperatorConfig extends Document implements OperatorConfigEntity {
  @Prop()
  operator: string;
  @Prop()
  order: number;
  @Prop()
  currencies: string[];
  @Prop()
  layout?: boolean;
  @Prop()
  template?: string;
  @Prop()
  logo?: string;
}

export const OperatorConfigSchema =
  SchemaFactory.createForClass(OperatorConfig);
