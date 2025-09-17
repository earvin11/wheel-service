import { Module } from '@nestjs/common';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { LoggerSeq } from './implementations/logger.seq';
import { envs } from 'src/config/envs';
import { SEQ_LOGGER_OPTIONS } from './logger-seq.config';
// import { LoggerWinston } from './implementations/logger.winston';

@Module({
  providers: [
    // LoggerWinston,
    LoggerSeq,
    {
      provide: SEQ_LOGGER_OPTIONS,
      useValue: {
        seqUrl: envs.seqUrl,
        apiKey: envs.seqApiKey || '',
        application: envs.pathWs,
        minimumLevel: 'information',
      },
    },
    {
      provide: LoggerPort,
      useExisting: LoggerSeq,
      // useExisting: LoggerWinston,
    },
  ],
  exports: [LoggerPort],
})
export class LoggerModule {}
