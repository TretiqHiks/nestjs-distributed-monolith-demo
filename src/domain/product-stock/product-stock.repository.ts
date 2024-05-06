import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStock } from '../models/productStock.entity';
import { Repository } from 'typeorm';
import { CreateProductStockMessageDTO } from './rabbitmq_dto/createProductStockMessageDTO';

@Injectable()
export class ProductStockRepository {
  constructor(
    @InjectRepository(ProductStock)
    private productStockRepository: Repository<ProductStock>,
  ) {}

  async saveProductStock(
    createProductStockMessageDTO: CreateProductStockMessageDTO,
  ): Promise<ProductStock> {
    const newProductStock = this.productStockRepository.create(
      createProductStockMessageDTO,
    );
    await this.productStockRepository.save(newProductStock);
    return newProductStock;
  }

  async getProductStockByProductId(product_id: string) {
    return await this.productStockRepository.findOneBy({
      product_id,
    });
  }

  async addAmountToStock(
    product_id: string,
    addAmount: number,
  ): Promise<ProductStock> {
    const productStock = await this.getProductStockByProductId(product_id);
    productStock.amount += addAmount;
    return this.productStockRepository.save(productStock);
  }
}
