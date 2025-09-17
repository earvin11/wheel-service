export abstract class CommunicationCurrencyPort {
  abstract findByISOCode(isoCode: string): Promise<CurrencyDataResponse>;
}

export interface CurrencyDataResponse {
  id: string;
  name: string;
  short: string;
  symbol: string;
  usdExchange: number;
  exchangeApi: boolean;
  exchangeApiURL: string;
}
