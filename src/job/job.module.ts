import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Job } from './job.entity';
import { JobSchema } from './job.schema';

@Module({
    imports: [
        TypeOrmModule.forFeature([Job]),
        MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }]),
    ],
    providers: [JobService],
    controllers: [JobController],
})
export class JobModule { }
