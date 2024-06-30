import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Job } from './job.entity';
import { JobSchema } from './job.schema';

@Module({
    imports: [
        TypeOrmModule.forFeature([Job]),
        MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }]),
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
        BullModule.registerQueue({
            name: 'codeSaveQueue',
        }),
        BullModule.registerQueue({
            name: 'codeExecQueue',
        }),
    ],
    providers: [JobService],
    controllers: [JobController],
})
export class JobModule { }
