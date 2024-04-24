import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../models/product.entity';
import { RabbitmqService } from '../../infrastructure/rabbitmq/rabbitmq.service';
import { RabbitMQModule } from '../../infrastructure/rabbitmq/rabbitmq.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), RabbitMQModule],
  providers: [ProductRepository, ProductService, RabbitmqService],
  controllers: [ProductController],
})
export class ProductModule {}
