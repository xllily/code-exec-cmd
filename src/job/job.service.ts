import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class JobService {
    private client: ClientProxy;
    private readonly logger = new Logger(JobService.name);

    constructor(
        @InjectRepository(Job)
        private jobRepository: Repository<Job>,
    ) {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3003,
            },
        });
    }

    async createJob(code: string): Promise<Job> {
        const job = this.jobRepository.create({ code });
        const savedJob = await this.jobRepository.save(job);

        this.logger.log(`Job created with ID: ${savedJob.id}`);
        this.client.emit('job_created', savedJob.id);
        return savedJob;
    }

    async getJobResult(id: string): Promise<Job> {
        return this.jobRepository.findOne({ where: { id } });
    }
}
