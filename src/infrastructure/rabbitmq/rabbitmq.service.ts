import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { RabbitMQConfig } from './rabbitmq.config';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private client: ClientProxy;

  constructor(private rabbitMQConfig: RabbitMQConfig) {}

  onModuleInit() {
    const rmqOptions = this.rabbitMQConfig.getRmqOptions();
    this.client = ClientProxyFactory.create(rmqOptions);
    this.connect();
  }

  private async connect() {
    try {
      await this.client.connect();
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  async send(pattern: string, data: any): Promise<any> {
    return this.client.send(pattern, data).toPromise();
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
