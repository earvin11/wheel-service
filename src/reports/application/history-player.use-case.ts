import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryPlayerUseCase {
  async run(data: { playerId: string; skip: number; limit: number }) {
    return [
      {
        created: '2025-08-07 12:32:08',
        createdFormat: '07\/08 09:32:08 AM',
        description: 'Premio en Sprint Gaming #5627877140',
        reference: '1fa1fca1-351e-42a1-a531-5088cb2dc366',
        platform: 'Sprint\u00a0Games',
        debit: 0,
        debitFormat: '-',
        credit: '0',
        creditFormat: '0,00',
        balance: '482.3',
        balanceFormat: '482,30',
      },
      {
        created: '2025-08-07 12:31:34',
        createdFormat: '07\/08 09:31:34 AM',
        description: 'Debitando en Sprint Gaming #5627877140',
        reference: '1fa1fca1-351e-42a1-a531-5088cb2dc366',
        platform: 'Sprint\u00a0Games',
        debit: '0.4',
        debitFormat: '0,40',
        credit: 0,
        creditFormat: '-',
        balance: '482.3000000000003',
        balanceFormat: '482,30',
      },
      {
        created: '2025-08-07 12:25:01',
        createdFormat: '07\/08 09:25:01 AM',
        description: 'Premio en Sprint Gaming #9800515103',
        reference: '792550d9-be6e-4480-a51d-98bf0b5f9fcc',
        platform: 'Sprint\u00a0Games',
        debit: 0,
        debitFormat: '-',
        credit: '0',
        creditFormat: '0,00',
        balance: '482.7',
        balanceFormat: '482,70',
      },
      {
        created: '2025-08-07 12:24:27',
        createdFormat: '07\/08 09:24:27 AM',
        description: 'Debitando en Sprint Gaming #9800515103',
        reference: '792550d9-be6e-4480-a51d-98bf0b5f9fcc',
        platform: 'Sprint\u00a0Games',
        debit: '9',
        debitFormat: '9,00',
        credit: 0,
        creditFormat: '-',
        balance: '482.7000000000003',
        balanceFormat: '482,70',
      },
    ];
  }
}
