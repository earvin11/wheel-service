import { EventsEnum } from '../../shared/enums/events.enum';

export abstract class EventPublisher {
  abstract emit(event: EventsEnum, payload: any): void;
  abstract on(event: EventsEnum, handler: (payload: any) => void): void;
}
