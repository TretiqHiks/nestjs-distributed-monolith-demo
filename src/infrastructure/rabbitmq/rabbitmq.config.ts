import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQConfig {
  constructor(private configService: ConfigService) {}

  getRmqOptions(): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [
          this.configService.get<string>('RMQ_URL', 'amqp://localhost:5672'),
        ],
        queue: 'product_created_queue',
        queueOptions: {
          durable: true,
        },
        noAck: true,
        prefetchCount: 1,
      },
    };
  }
}
