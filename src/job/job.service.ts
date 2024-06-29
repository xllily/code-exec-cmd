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
        @InjectQueue('jobQueue') private jobQueue: Queue,
        @InjectModel('Job') private mongoJobModel: Model<MongoJob>,
    ) { }

    async createJob(code: string): Promise<Job> {
        const job = this.jobRepository.create({ code });
        const savedJob = await this.jobRepository.save(job);

        this.logger.log(`Job created with ID: ${savedJob.id}`);
        await this.jobQueue.add('processJob', { jobId: savedJob.id });
        return savedJob;
    }

    async getJobResult(id: string): Promise<MongoJob> {
        return this.mongoJobModel.findById(id).exec();
    }
}
