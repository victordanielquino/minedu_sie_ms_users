import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/enums';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    Transport: Transport.RMQ,
    options: {
      url: [process.env.AMQP_URL],
      queu: RabbitMQ.UserQue,
    },
  });
  await app.listen();
}
bootstrap();
