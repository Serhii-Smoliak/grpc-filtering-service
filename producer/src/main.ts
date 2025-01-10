import { NestFactory } from '@nestjs/core';
import { ProducerModule } from './producer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ProducerModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `${process.env.PRODUCER_URL}:${process.env.PRODUCER_PORT}`,
      package: process.env.PROTO_PACKAGE,
      protoPath: process.env.PROTO_PATH,
    },
  });

  await app.startAllMicroservices();
  console.log('Producer is running...');
}

bootstrap();
