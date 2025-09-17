import { IsObject, IsString } from 'class-validator';

export class CreateBetFavoriteDto {
  @IsString()
  roulette: string;
  @IsString()
  player: string;
  @IsObject()
  bet: Record<string, any>;
}
