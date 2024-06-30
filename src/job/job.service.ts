import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Job } from './job.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job as MongoJob } from './job.interface';

@Injectable()
export class JobService {
    private readonly logger = new Logger(JobService.name);

    constructor(
        @InjectRepository(Job)
        private jobRepository: Repository<Job>,
        @InjectQueue('codeSaveQueue') private codeSaveQueue: Queue,
        @InjectQueue('codeExecQueue') private codeExecQueue: Queue,
        @InjectModel('Job') private mongoJobModel: Model<MongoJob>,
    ) { }

    async createJob(code: string): Promise<Job> {
        const job = this.jobRepository.create({ status: 'pending' });
        const savedJob = await this.jobRepository.save(job);

        this.logger.log(`Job created with ID: ${savedJob.id}`);
        await this.codeSaveQueue.add('saveCode', { jobId: savedJob.id, code });
        return savedJob;
    }

    async getJobResult(id: string): Promise<{ status: string; result: string }> {
        const mongoJob = await this.mongoJobModel.findById(id).exec();
        if (!mongoJob) {
            return { status: 'not_found', result: null };
        }
        return { status: mongoJob.status, result: mongoJob.result };
    }
}
