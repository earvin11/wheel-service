import { CommunicationOperatorPort } from 'src/comunication-ms/domain/ports/communication-operator.port';

export class CommunicationOperatorMock implements CommunicationOperatorPort {
  findById(id: string): Promise<any> {
    return new Promise((res) => {
      res({
        status: true,
        available: true,
        buttonLobby: false,
        buttonSupport: false,
        background: '',
        logo: '',
        cruppierLogo: '',
        primaryColor: '#830707',
        secondaryColor: '#062e6f',
        useLogo: false,
        loaderLogo: '',
        _id: '6377d0e9bc2612755f975361',
        name: 'operatorRoot',
        client: {
          status: true,
          available: true,
          useLogo: true,
          urlGames: 'https://st-apiroulette.kingconnections.net/client',
          _id: '6377d0e9bc2612755f975353',
          name: 'ClientRoot',
          logo: 'http://pmd-studio.com/blog/wp-content/uploads/2012/04/good_clients.jpg',
          token: '44840465-163a-42d4-ac6e-5f8551ecedc1',
          endpointAuth:
            'https://api-dev-v2.whatsbet.net/i/product/c/bcsuite/f61e98a2-73ec-4daf-bfe0-aa9e7ae91940/profile',
          endpointBet:
            'https://api-dev-v2.whatsbet.net/i/product/c/bcsuite/f61e98a2-73ec-4daf-bfe0-aa9e7ae91940/bet',
          endpointWin:
            'https://api-dev-v2.whatsbet.net/i/product/c/bcsuite/f61e98a2-73ec-4daf-bfe0-aa9e7ae91940/win',
          endpointRollback: 'https://roolback.com',
          createdAt: '2022-11-18T18:37:29.751Z',
          updatedAt: '2025-01-13T19:32:21.914Z',
          __v: 0,
          loaderLogo: 'https://roolback.com',
          uuid: id,
        },
        operatorId: 1000,
        createdAt: '2022-11-18T18:37:29.882Z',
        updatedAt: '2025-05-01T13:42:31.988Z',
        __v: 0,
        endpointAuth:
          'https://api-dev-v2.whatsbet.net/i/product/c/bcsuite/f61e98a2-73ec-4daf-bfe0-aa9e7ae91940/profile',
        endpointBet:
          'https://api-dev-v2.whatsbet.net/i/product/c/bcsuite/f61e98a2-73ec-4daf-bfe0-aa9e7ae91940/bet',
        endpointRollback:
          'https://api-dev-v2.whatsbet.net/i/product/c/bcsuite/f61e98a2-73ec-4daf-bfe0-aa9e7ae91940/rollback',
        endpointWin:
          'https://api-dev-v2.whatsbet.net/i/product/c/bcsuite/f61e98a2-73ec-4daf-bfe0-aa9e7ae91940/win',
        uuid: 'c89edc11-3364-4b18-b908-a987991503d7',
        urlgames: 'https://st-apiroulette.kingconnections.net/operator',
        urlGames: 'https://st-apiroulette.kingconnections.net/operator',
      });
    });
  }
}
