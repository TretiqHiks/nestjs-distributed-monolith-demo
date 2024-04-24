import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitMQConfig } from './rabbitmq.config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductStockConsumer } from '../../domain/product-stock/product-stock.consumer';
import { ProductStockModule } from '../../domain/product-stock/product-stock.module';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_SERVICE',
        imports: [RabbitMQModule],
        useFactory: async (rabbitMQConfig: RabbitMQConfig) => ({
          transport: Transport.RMQ,
          options: rabbitMQConfig.getRmqOptions().options,
        }),
        inject: [RabbitMQConfig],
      },
    ]),
    ProductStockModule,
  ],
  providers: [RabbitmqService, RabbitMQConfig],
  controllers: [ProductStockConsumer],
  exports: [RabbitmqService, RabbitMQConfig],
})
export class RabbitMQModule {}
