import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobSchema } from './job.schema';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'code-save',
        }),
        MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }]),
    ],
    controllers: [JobController],
    providers: [JobService],
})
export class JobModule { }
