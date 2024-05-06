import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rabbitMqUrl = configService.get<string>('RMQ_URL');
  const port = configService.get<number>('HTTP_PORT');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqUrl],
      queue: 'init_queue',
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  console.log(
    `Microservice is listening on RMQ and HTTP server is running on port ${port}`,
  );
}

try {
  bootstrap();
} catch (error) {
  console.log('Error starting up:');
  console.log(error);
}
