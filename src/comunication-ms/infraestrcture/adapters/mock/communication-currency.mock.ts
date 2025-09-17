import { CommunicationCurrencyPort } from 'src/comunication-ms/domain/ports/communiaction-currency.port';

export class CommunicationCurrencyMock implements CommunicationCurrencyPort {
  private currencies = [
    {
      _id: '6377d0e9bc2612755f97534b',
      name: 'Dolar',
      short: 'USD',
      symbol: '$',
      usdExchange: 1,
      createdAt: '2022-11-18T18:37:29.738Z',
      updatedAt: '2025-07-01T00:00:03.106Z',
      status: true,
      exchangeApi: false,
      exchangeApiURL: null,
      uuid: '2c6754cc-534c-4f0e-83c8-a52ff1e7d75d',
    },
    {
      _id: '6377d0e9bc2612755f97534e',
      name: 'Guarani',
      short: 'PYG',
      symbol: '₲ ',
      createdAt: '2022-11-18T18:37:29.739Z',
      updatedAt: '2025-07-01T00:00:19.801Z',
      usdExchange: 0.000125,
      status: true,
      exchangeApi: false,
      exchangeApiURL: null,
      uuid: '00f03f76-c7e0-4631-839b-32e66a5a8ae3',
    },
    {
      _id: '63aedf701954edaa588dc5f2',
      name: 'Peso Argentino',
      short: 'ARS',
      symbol: '$',
      usdExchange: 0.0007575757575757576,
      exchangeApi: false,
      status: true,
      createdAt: '2022-12-30T12:54:08.489Z',
      updatedAt: '2025-07-25T12:00:00.412Z',
      exchangeApiURL: null,
      uuid: '66516c5f-f05c-45dc-ba07-13946a386cd0',
    },
    {
      _id: '64711b70ae71bfe76a880120',
      name: 'Bolivares',
      short: 'VES',
      symbol: 'VES',
      usdExchange: 0.009314,
      exchangeApi: false,
      status: true,
      createdAt: '2023-05-26T20:49:52.936Z',
      updatedAt: '2025-07-01T00:00:34.099Z',
      exchangeApiURL: null,
      uuid: 'd5dc3f56-c69a-4e99-9624-8a03f5e1436e',
    },
  ];

  findByISOCode(isoCode: string): Promise<any> {
    return new Promise((res) => {
      res(this.currencies.find((currency) => currency.short === isoCode));
    });
  }
}
