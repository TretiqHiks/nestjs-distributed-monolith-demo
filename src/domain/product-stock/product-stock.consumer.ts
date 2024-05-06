import { Injectable } from '@nestjs/common';
import { ProductStockService } from './product-stock.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CreateProductStockMessageDTO } from './rabbitmq_dto/createProductStockMessageDTO';

@Injectable()
export class ProductStockConsumer {
  constructor(private productStockService: ProductStockService) {}
  @RabbitSubscribe({
    exchange: 'exchange_1',
    routingKey: 'product.created',
    queue: 'product_created_queue',
  })
  public async handleProductCreated(msg: any, amqpMsg: any) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
    const productStockDTO = new CreateProductStockMessageDTO();
    productStockDTO.product_id = msg.data;
    productStockDTO.amount = 0;
    const result = await this.productStockService.createProductStock(productStockDTO);
    console.log(result);
  }
}
