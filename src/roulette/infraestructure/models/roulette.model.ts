import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RouletteEntity } from 'src/roulette/domain/entites/roulette.entity';

@Schema()
export class Roulette extends Document implements RouletteEntity {
  @Prop()
  operator: string;

  @Prop()
  roulette: string;

  @Prop()
  name: string;

  @Prop()
  providerId: string;

  @Prop()
  roundDuration: number;

  @Prop()
  timeToReleaseJack: number;

  @Prop()
  urlTransmision: string;

  @Prop()
  openingTime: string;

  @Prop()
  closingTime: string;

  @Prop()
  imgBackground: string;

  @Prop()
  maxPlenosBet: number;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  manualDisable?: boolean;

  @Prop({ default: false })
  isManualRoulette: boolean;

  @Prop({ default: false })
  doubleZero: boolean;

  @Prop({ default: false })
  jackpot: boolean;

  // @Prop()
  // order: number;

  // @Prop({ default: 36 })
  // pleno: number;

  // @Prop({ default: 18 })
  // semipleno: number;

  // @Prop({ default: 9 })
  // cuadro: number;

  // @Prop({ default: 12 })
  // calle: number;

  // @Prop({ default: 6 })
  // linea: number;

  // @Prop({ default: 3 })
  // columna: number;

  // @Prop({ default: 2 })
  // docena: number;

  // @Prop({ default: 2 })
  // chanceSimple: number;

  // @Prop({ default: 12 })
  // cubre: number;

  // @Prop({ default: 7 })
  // specialCalle: number;

  @Prop({ unique: true, index: true })
  uuid: string;

  @Prop()
  layout?: boolean;

  @Prop()
  template?: string;

  @Prop()
  logo?: string;
}

export const RouletteSchema = SchemaFactory.createForClass(Roulette);
