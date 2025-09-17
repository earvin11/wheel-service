import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  dirname: 'logs', // carpeta donde se guardan
  filename: 'error-%DATE%.log', // nombre del archivo por fecha
  datePattern: 'YYYY-MM-DD', // patrón de fecha
  zippedArchive: true, // opcional: comprime los logs antiguos
  maxSize: '20m', // tamaño máximo antes de rotar
  maxFiles: '14d', // guarda logs por 14 días
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, context }) => {
      return `${timestamp} [${level}]${context ? ` [${context}]` : ''} ${message}`;
    }),
  ),
});

export const winstonConfig: winston.LoggerOptions = {
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('NestApp', {
          prettyPrint: true,
        }),
      ),
    }),

    dailyRotateFileTransport,
  ],
};
