import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import * as express from 'express';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  const jobQueue = app.get<Queue>(getQueueToken('jobQueue'));

  createBullBoard({
    queues: [new BullAdapter(jobQueue)],
    serverAdapter,
  });

  const server = express();
  server.use('/admin/queues', serverAdapter.getRouter());

  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(3000);
}
bootstrap();
