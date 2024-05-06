import { Injectable } from '@nestjs/common';
import { ProductStockRepository } from './product-stock.repository';
import { GetProductStockByProductIdDTO } from './dto/getProductStockByProductIdDTO';
import { CreateProductStockMessageDTO } from './rabbitmq_dto/createProductStockMessageDTO';

@Injectable()
export class ProductStockService {
  constructor(
    private readonly productStockRepository: ProductStockRepository,
  ) {}

  async getProductStockByProductId(product_id: string) {
    const product =
      await this.productStockRepository.getProductStockByProductId(product_id);
    const response = new GetProductStockByProductIdDTO();
    console.log(product);
    response.product_id = product_id;
    response.amount = product.amount;
    return response;
  }

  async createProductStock(
    createProductStockDTO: CreateProductStockMessageDTO,
  ) {
    const result = await this.productStockRepository.saveProductStock(
      createProductStockDTO,
    );
    return result;
  }

  async addAmountToStock(product_id: string, amountToAdd: number) {
    const productStock = await this.productStockRepository.addAmountToStock(
      product_id,
      amountToAdd,
    );
    const response = new GetProductStockByProductIdDTO();
    response.product_id = productStock.product_id;
    response.amount = productStock.amount;
    return response;
  }
}
