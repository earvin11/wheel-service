import { Injectable } from '@nestjs/common';
import { EventPublisher } from '../domain/event-publisher';
import { EventsEnum } from '../../shared/enums/events.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EmitteryEventPublisher implements EventPublisher {
  constructor(private eventEmitter: EventEmitter2) {}

  emit(event: EventsEnum, payload: any): void {
    this.eventEmitter.emit(event, payload);
  }

  on(event: EventsEnum, handler: (payload: any) => void): void {
    this.eventEmitter.on(event, handler);
  }
}
