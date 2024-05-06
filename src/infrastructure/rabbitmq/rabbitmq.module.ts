// rabbitmq.module.ts
import { Module, Global } from '@nestjs/common';
import { RabbitMQModule as NestRabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQService } from './rabbitmq.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    NestRabbitMQModule.forRootAsync(NestRabbitMQModule, {
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        exchanges: [{ name: 'exchange_1', type: 'topic' }],
        uri: configService.get<string>(
          'RMQ_URL',
          'amqp://default:default@localhost:5672',
        ),
        connectionInitOptions: { wait: false },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RabbitMQService],
  exports: [NestRabbitMQModule, RabbitMQService],
})
export class RabbitMQModule {}
