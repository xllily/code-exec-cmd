import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job as MongoJob } from './job.interface';

@Injectable()
export class JobService {
    private client: ClientProxy;
    private readonly logger = new Logger(JobService.name);

    constructor(
        @InjectRepository(Job)
        private jobRepository: Repository<Job>,
        @InjectModel('Job') private mongoJobModel: Model<MongoJob>,
    ) {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3003, // 确保这个端口与 worker 服务中的端口一致
            },
        });
    }

    async createJob(code: string): Promise<Job> {
        const job = this.jobRepository.create({ code });
        const savedJob = await this.jobRepository.save(job);

        this.logger.log(`Job created with ID: ${savedJob.id}`);
        this.client.emit('job_created', savedJob.id); // 将任务 ID 发送到队列
        return savedJob;
    }

    async getJobResult(id: string): Promise<MongoJob> {
        return this.mongoJobModel.findById(id).exec();
    }
}
