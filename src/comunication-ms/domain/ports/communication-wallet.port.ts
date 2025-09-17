import {
  AuthPlayerGatewayResponse,
  CreditWalletRequest,
  DebitWalletRequest,
  DebitWalletResponse,
} from '../interfaces/wallet.interfaces';

export abstract class CommunicationWalletPort {
  abstract debit<T>(
    operatorId: string,
    data: DebitWalletRequest,
  ): Promise<DebitWalletResponse>;
  abstract credit<T>(
    operatorId: string,
    data: CreditWalletRequest,
  ): Promise<any>;
  abstract auth(
    operatorId: string,
    token: string,
  ): Promise<AuthPlayerGatewayResponse>;
}
