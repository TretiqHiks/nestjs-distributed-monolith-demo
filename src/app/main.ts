import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const rabbitMqUrl = configService.get<string>('RMQ_URL');
  const port = configService.get<number>('HTTP_PORT');

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMqUrl],
        queue: 'product_created_queue',
      },
    });
  const app = await NestFactory.create(AppModule);

  await Promise.all([
    microservice.listen().then(() => console.log('RMQ Listening')),
    app.listen(port).then(() => console.log('REST Listening')),
  ])
}

try {
  bootstrap();
} catch (error) {
  console.log('Error starting up:');
  console.log(error);
}
