import { Module } from '@nestjs/common';
import { ProductStockService } from './product-stock.service';
import { ProductStockController } from './product-stock.controller';
import { ProductStockRepository } from './product-stock.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStock } from '../models/productStock.entity';
import { ProductStockConsumer } from './product-stock.consumer';
import { RabbitMQModule } from '../../infrastructure/rabbitmq/rabbitmq.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductStock]), RabbitMQModule],
  providers: [
    ProductStockRepository,
    ProductStockService,
    ProductStockConsumer,
  ],
  controllers: [ProductStockController],
  exports: [ProductStockService],
})
export class ProductStockModule {}
