import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async publish(routing_key: string, message: any) {
    const messageObject =
      typeof message === 'object' ? message : { data: message };

    await this.amqpConnection.publish('exchange_1', routing_key, messageObject);
  }
}
