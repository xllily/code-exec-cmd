import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Job } from './job.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobService {
    private readonly logger = new Logger(JobService.name);

    constructor(
        @InjectModel('Job') private readonly jobModel: Model<Job>,
        @InjectQueue('code-save') private readonly codeSaveQueue: Queue,
    ) { }

    async createJob(code: string): Promise<{ jobId: string }> {
        const job = new this.jobModel({
            _id: uuidv4(),
            code,
            status: 'pending',
        });

        const savedJob = await job.save();
        this.logger.log(`Saved job with id: ${savedJob._id}`);

        await this.codeSaveQueue.add('saveCode', {
            jobId: savedJob._id,
            code,
        });

        return { jobId: savedJob._id };
    }

    async getJobResult(jobId: string): Promise<{ status: string; result: string }> {
        const job = await this.jobModel.findById(jobId).exec();
        if (!job) {
            return { status: 'not_found', result: null };
        }
        return { status: job.status, result: job.result };
    }
}
