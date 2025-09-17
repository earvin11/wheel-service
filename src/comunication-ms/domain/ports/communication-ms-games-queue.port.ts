export abstract class CommunicationMsGamesQueuePort {
  abstract sendRoundEvent(data: any): Promise<void>;
}
