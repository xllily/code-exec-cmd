import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import * as express from 'express';
import { getQueueToken } from '@nestjs/bull';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  const codeSaveQueue = app.get(getQueueToken('code-save'));
  const codeExecQueue = app.get(getQueueToken('code-exec'));

  createBullBoard({
    queues: [new BullAdapter(codeSaveQueue), new BullAdapter(codeExecQueue)],
    serverAdapter,
  });

  const server = express();
  server.use('/admin/queues', serverAdapter.getRouter());

  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(process.env.COMMAND_PORT || 3000);
}
bootstrap();
