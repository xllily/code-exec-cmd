import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './job/typeorm.config';
import { JobModule } from './job/job.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), JobModule],
})
export class AppModule { }
