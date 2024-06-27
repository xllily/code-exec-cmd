import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @Post('submit-code')
    async submitCode(@Body('code') code: string) {
        const job = await this.jobService.createJob(code);
        return { jobId: job.id };
    }

    @Get('exec-result')
    async getResult(@Query('jobId') jobId: string) {
        const job = await this.jobService.getJobResult(jobId);
        return { status: job.status, result: job.result };
    }
}
