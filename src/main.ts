import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3002,  // 确保端口不冲突
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
