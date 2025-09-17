import { BetEntity } from '../entities/bet.entity';

export abstract class BetRepository {
  abstract create(data: BetEntity): Promise<BetEntity>;
  abstract createMany(data: BetEntity[]): Promise<BetEntity[]>;
  abstract findAll(page: number, limit: number): Promise<BetEntity[] | []>;
  abstract findById(id: string): Promise<BetEntity | null>;
  abstract findByUuid(uuid: string): Promise<BetEntity | null>;
  abstract findOneBy(filter: Record<string, any>): Promise<BetEntity | null>;
  abstract findManyBy(
    filter: Record<string, any>,
    sort?: Record<string, 1 | -1>,
    limit?: number,
  ): Promise<BetEntity[] | []>;
  abstract findBetsWinnerWithEarningsGroupPlayer(
    roundUuid: string,
  ): Promise<RespBetsWithEarnings[] | []>;
  abstract update(
    id: string,
    data: Partial<BetEntity>,
  ): Promise<BetEntity | null>;
  abstract updateByUuid(
    uuid: string,
    data: Partial<BetEntity>,
  ): Promise<BetEntity | null>;
  //TODO:
  abstract updateMany(
    filter: Record<string, any>,
    fields: Record<string, any>,
  ): Promise<any>;
  abstract remove(id: string): Promise<BetEntity | null>;
}

export interface RespBetsWithEarnings {
  _id: string;
  totalWinnings: number;
  operatorUuid: string;
  betReference: string;
  betWinCount: number;
  playerWalletId: string;
  currency: string;
  gameUuid: string;
  bets: Record<string, any>;
  createdAt: string;
}
