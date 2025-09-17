import {
  DebitWalletRequest,
  CreditWalletRequest,
} from 'src/comunication-ms/domain/interfaces/wallet.interfaces';
import { CommunicationWalletPort } from 'src/comunication-ms/domain/ports/communication-wallet.port';

export class CommunicationWalletMock implements CommunicationWalletPort {
  debit<T>(operatorId: string, data: DebitWalletRequest): Promise<any> {
    return new Promise((res) => {
      res({
        msg: 'Debit succesfully',
      });
    });
  }
  credit<T>(operatorId: string, data: CreditWalletRequest): Promise<any> {
    console.log({
      operatorId,
      data,
    });
    return new Promise((res) => {
      res({
        msg: 'Credit succesfully',
      });
    });
  }
  auth(operatorId: string, token: string): Promise<any> {
    return new Promise((res) => {
      res({
        ok: true,
        mensaje: 'Conexión Correcta.',
        userId: '335955',
        username: 'jackpot6',
        lastBalance: '26670.400000021997',
        country_code: 'VE',
        email: 'jackpot6@jackpot6.com',
        first_name: 'jackpot6',
        last_name: 'jackpot6',
        currency: 'USD',
        available_balance: '26670.400000021997',
        WL: 'Juegala',
      });
    });
  }
}
