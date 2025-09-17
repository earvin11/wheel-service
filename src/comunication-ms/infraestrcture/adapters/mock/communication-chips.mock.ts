import { CommunicationChipsPort } from 'src/comunication-ms/domain/ports/communication-chips.port';

export class CommunicationChipsMock implements CommunicationChipsPort {
  async findByOperatorAndCurrency(
    operator: string,
    currency: string,
  ): Promise<any> {
    return new Promise((res) => {
      res([
        {
          color: {
            primary: '#fff',
            secondary: '#0f0',
          },
          _id: '66d781d50d60ad0061d4fd69',
          currency: '6377d0e9bc2612755f97534b',
          operator: '65f059218bcb158d94e4f3aa',
          number: '0.1',
          value: 0.1,
          active: true,
          __v: 0,
        },
        {
          color: {
            primary: '#fff',
            secondary: '#f00',
          },
          _id: '66d781d50d60ad0061d4fd6c',
          currency: '6377d0e9bc2612755f97534b',
          operator: '65f059218bcb158d94e4f3aa',
          number: '20',
          value: 20,
          active: true,
          __v: 0,
        },
        {
          color: {
            primary: '#fff',
            secondary: '#00f',
          },
          _id: '66d781d50d60ad0061d4fd6a',
          currency: '6377d0e9bc2612755f97534b',
          operator: '65f059218bcb158d94e4f3aa',
          number: '1',
          value: 1,
          active: true,
          __v: 0,
        },
        {
          color: {
            primary: '#fff',
            secondary: '#000',
          },
          _id: '66d781d50d60ad0061d4fd6b',
          currency: '6377d0e9bc2612755f97534b',
          operator: '65f059218bcb158d94e4f3aa',
          number: '10',
          value: 10,
          active: true,
          __v: 0,
        },
        {
          color: {
            primary: '#fff',
            secondary: '#ff0',
          },
          _id: '66d781d50d60ad0061d4fd6d',
          currency: '6377d0e9bc2612755f97534b',
          operator: '65f059218bcb158d94e4f3aa',
          number: '50',
          value: 50,
          active: true,
          __v: 0,
        },
        {
          color: {
            primary: '#fff',
            secondary: '#fa0',
          },
          _id: '66d781d50d60ad0061d4fd6e',
          currency: '6377d0e9bc2612755f97534b',
          operator: '65f059218bcb158d94e4f3aa',
          number: '100',
          value: 100,
          active: true,
          __v: 0,
        },
      ]);
    });
  }
}
