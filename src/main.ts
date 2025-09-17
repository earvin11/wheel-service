import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
// import { WinstonModule } from 'nest-winston';
import { envs } from './config/envs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
// import { winstonConfig } from './logging/infraestructure/winston.config';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    // logger: WinstonModule.createLogger(winstonConfig)
  });
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter()); // Filtro de errores

  // Conexión a RabbitMQ
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [envs.rabbitMqUrl],
  //     queue: 'player_queue',
  //     queueOptions: {
  //       durable: false
  //     },
  //   },
  // });

  const config = new DocumentBuilder()
    .setTitle('Roulette Service')
    .setDescription('')
    .setVersion('1.0')
    // .addServer(`${envs.pathWs}`)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api');
  app.enableShutdownHooks();

  app.enableCors();

  // await app.startAllMicroservices();

  await app.listen(envs.port, '0.0.0.0');

  logger.log(`App running in port ${envs.port}`);
  logger.log(`PATH_WS in ${envs.pathWs}`);
}
bootstrap();
