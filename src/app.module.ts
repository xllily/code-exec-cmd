import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModule } from './job/job.module';
import { typeOrmConfig } from './job/typeorm.config';
import { mongooseConfig } from './job/mongoose.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot(mongooseConfig.uri),
    JobModule,
  ],
})
export class AppModule { }
