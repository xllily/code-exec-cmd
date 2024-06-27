import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'jobs.sqlite',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
