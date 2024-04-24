import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductStockService } from './product-stock.service';
import { CreateProductStockMessageDTO } from './rabbitmq_dto/createProductStockMessageDTO';

@Controller()
export class ProductStockConsumer {
  constructor(private productStockService: ProductStockService) {}
  @MessagePattern('product_created_queue')
  async handleProductCreation(@Payload() message: any) {
    console.log(message);
    const newProductStockDTO = new CreateProductStockMessageDTO();
    newProductStockDTO.product_id = message;
    newProductStockDTO.amount = 0;
    const newProductStock =
      await this.productStockService.createProductStock(newProductStockDTO);
    console.log(newProductStock);
  }
}
