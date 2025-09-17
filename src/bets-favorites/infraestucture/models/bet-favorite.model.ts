import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BetFavoriteEntity } from 'src/bets-favorites/domain/bet-favorite.entity';

@Schema()
export class BetFavoriteModel extends Document implements BetFavoriteEntity {
  @Prop()
  player: string;
  @Prop()
  roulette: string;
  @Prop({ type: Object })
  bet: Record<string, any>;
}

export const BetFavoriteSchema = SchemaFactory.createForClass(BetFavoriteModel);
