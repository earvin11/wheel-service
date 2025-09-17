export abstract class CommunicationOperatorPort {
  abstract findById(id: string): Promise<OperatorReponse>;
}
export interface OperatorReponse {
  id: string;
  name: string;
  status: boolean;
  endpointAuth: string;
  endpointBet: string;
  endpointWin: string;
  endpointRollback: string;
  available: boolean;
  buttonLobby: boolean;
  buttonSupport: boolean;
  urlGames: string;
  background: string;
  logo: string;
  cruppierLogo: string;
  primaryColor: string;
  secondaryColor: string;
  useLogo: boolean;
  loaderLogo: string;
}
