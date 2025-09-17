export abstract class CommunicationReportsPort {
  abstract create(data: CreateReportInterface): Promise<any>;
}

export interface CreateReportInterface {
  userId: string;
  operatorId: string;
  roundId: string;
  gameId: string;
  amount: number;
  currency: string;
  platform: string;
  transactionType: 'bet' | 'win' | 'rollback';
}
