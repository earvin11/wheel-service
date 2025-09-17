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

  @Prop({ default: 36 })
  pleno: number;

  @Prop({ default: 18 })
  semiPleno: number;

  @Prop({ default: 9 })
  cuadro: number;

  @Prop({ default: 12 })
  calle: number;

  @Prop({ default: 6 })
  linea: number;

  @Prop({ default: 3 })
  column: number;

  @Prop({ default: 2 })
  dozens: number;

  @Prop({ default: 2 })
  chanceSimple: number;

  @Prop({ default: 2 })
  evenOdd: number;

  @Prop({ default: 2 })
  color: number;

  @Prop({ default: 12 })
  cubre: number;

  @Prop({ default: 7 })
  specialCalle: number;

  @Prop()
  layout?: boolean;

  @Prop()
  template?: string;

  @Prop()
  logo?: string;
}

export const OperatorConfigSchema =
  SchemaFactory.createForClass(OperatorConfig);
