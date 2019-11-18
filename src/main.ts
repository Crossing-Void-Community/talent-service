import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';

// Create a Logger instance
const logger = new Logger('TalentService');

let REDIS_URL: string = 'redis://localhost:6379';
if (process.env.REDIS_URL !== undefined) {
  REDIS_URL = process.env.REDIS_URL;
}

// Create a microservice options object
const microserviceOptions = {
  transport: Transport.REDIS,
  options: {
    url: REDIS_URL
  }
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions
  );
  app.listen(() => {
    logger.log('Talent Microservice is listening...');
  });
}

bootstrap();
