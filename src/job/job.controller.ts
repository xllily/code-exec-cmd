import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @Post('submit-code')
    async submitCode(@Body('code') code: string) {
        return this.jobService.createJob(code);
    }

    @Get('exec-result')
    async getExecResult(@Query('jobId') jobId: string) {
        return this.jobService.getJobResult(jobId);
    }
}
