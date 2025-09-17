import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { NameServices } from '../domain/enums/name-services.enum';
import { QueueNamesMS } from '../domain/enums/name-queues.enum';
import { CommunicationWalletPort } from '../domain/ports/communication-wallet.port';
import { CommunicationWalletRMQ } from './adapters/communication-wallet.rmq';
import { CommunicationOperatorRMQ } from './adapters/communication-operator.rmq';
import { CommunicationOperatorPort } from '../domain/ports/communication-operator.port';
import { CommunicationCurrencyRMQ } from './adapters/communication-currency.rmq';
import { CommunicationCurrencyPort } from '../domain/ports/communiaction-currency.port';
import { CommunicationChipsRMQ } from './adapters/communication-chips.rmq';
import { CommunicationChipsPort } from '../domain/ports/communication-chips.port';
import { CommunicationChipsMock } from './adapters/mock/communication-chips.mock';
import { CommunicationCurrencyMock } from './adapters/mock/communication-currency.mock';
import { CommunicationOperatorMock } from './adapters/mock/communication-operator.mock';
import { CommunicationWalletMock } from './adapters/mock/communication-wallet.mock';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { CommunicationReportsRMQ } from './adapters/communication-reports.rmq';
import { CommunicationReportsPort } from '../domain/ports/communication-reports.port';
import { CommunicationMsGamesQueueRMQ } from './adapters/communication-ms-games-queue.rmq';
import { CommunicationMsGamesQueuePort } from '../domain/ports/communication-ms-games-queue.port';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NameServices.PLAYER_SERVCE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitMqUrl],
          queue: QueueNamesMS.PLAYER_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: NameServices.OPERATOR_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitMqUrl],
          queue: QueueNamesMS.OPERATOR_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: NameServices.CURRENCY_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitMqUrl],
          queue: QueueNamesMS.CURRENCY_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: NameServices.REPORT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitMqUrl],
          queue: QueueNamesMS.REPORT_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: NameServices.MS_GAMES_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitMqUrl],
          queue: QueueNamesMS.MS_GAMES_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    LoggerModule,
  ],
  providers: [
    // Mocks
    CommunicationChipsMock,
    CommunicationCurrencyMock,
    CommunicationOperatorMock,
    CommunicationWalletMock,

    CommunicationChipsRMQ,
    CommunicationWalletRMQ,
    CommunicationOperatorRMQ,
    CommunicationCurrencyRMQ,
    CommunicationReportsRMQ,
    CommunicationMsGamesQueueRMQ,
    {
      provide: CommunicationWalletPort,
      useExisting: CommunicationWalletRMQ,
      // useExisting: CommunicationWalletMock
    },
    {
      provide: CommunicationOperatorPort,
      useExisting: CommunicationOperatorRMQ,
      // useExisting: CommunicationOperatorMock
    },
    {
      provide: CommunicationCurrencyPort,
      useExisting: CommunicationCurrencyRMQ,
      // useExisting: CommunicationCurrencyMock
    },
    {
      provide: CommunicationChipsPort,
      useExisting: CommunicationChipsRMQ,
      // useExisting: CommunicationChipsMock
    },
    {
      provide: CommunicationReportsPort,
      useExisting: CommunicationReportsRMQ,
    },
    {
      provide: CommunicationMsGamesQueuePort,
      useExisting: CommunicationMsGamesQueueRMQ,
    },
  ],
  exports: [
    CommunicationChipsPort,
    CommunicationCurrencyPort,
    CommunicationOperatorPort,
    CommunicationWalletPort,
    CommunicationReportsPort,
    CommunicationMsGamesQueuePort,
  ],
})
export class CommunicationMSModule {}
