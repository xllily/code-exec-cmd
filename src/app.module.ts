import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModule } from './job/job.module';
import { bullConfig } from './bull.config';
import { mongooseConfig } from './mongoose.config';


@Module({
  imports: [
    BullModule.forRoot(bullConfig),
    MongooseModule.forRoot(mongooseConfig.uri),
    BullModule.registerQueue({
      name: 'code-save',
    }),
    BullModule.registerQueue({
      name: 'code-exec',
    }),
    JobModule,
  ],
})
export class AppModule { }
