import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_URI: string;
  DB_NAME: string;
  REDIS_URI: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  PATH_WS: string;

  // RabbitMQ
  RABBITMQ_USER: string;
  RABBITMQ_PASS: string;
  RABBITMQ_HOST: string;
  RABBITMQ_PORT: string;

  SEQ_URL: string;
  SEQ_API_KEY: string;
  SEQ_WORKSAPCE: string;
}

const evnsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_URI: joi.string().required(),
    DB_NAME: joi.string().required(),
    REDIS_URI: joi.string().required(),
    REDIS_PORT: joi.string().required(),
    REDIS_PASSWORD: joi.string().required(),
    PATH_WS: joi.string().required(),

    RABBITMQ_USER: joi.string(),
    RABBITMQ_PASS: joi.string(),
    RABBITMQ_HOST: joi.string().required(),
    RABBITMQ_PORT: joi.string().required(),

    SEQ_URL: joi.string(), //.optional(),
    SEQ_API_KEY: joi.string(), //.optional(),
    SEQ_WORKSAPCE: joi.string(), //.optional(),
  })
  .unknown(true);

const { error, value } = evnsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbUri: envVars.DB_URI,
  dbName: envVars.DB_NAME,
  redisUri: envVars.REDIS_URI,
  redisPort: envVars.REDIS_PORT,
  redisPassword: envVars.REDIS_PASSWORD,
  pathWs: envVars.PATH_WS,

  rabbitMqUser: envVars.RABBITMQ_USER,
  rabbitMqPass: envVars.RABBITMQ_PASS,
  rabbitMqHost: envVars.RABBITMQ_HOST,
  rabbitMqPort: envVars.RABBITMQ_PORT,

  rabbitMqUrl: `amqp://${envVars.RABBITMQ_USER}:${envVars.RABBITMQ_PASS}@${envVars.RABBITMQ_HOST}:${envVars.RABBITMQ_PORT}`,

  seqUrl: envVars.SEQ_URL,
  seqApiKey: envVars.SEQ_API_KEY,
  seqWorkSpace: envVars.SEQ_WORKSAPCE,
};
