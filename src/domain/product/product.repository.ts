import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/product.entity';
import { Repository } from 'typeorm';
import { createProductDTO } from './dto/createProductDTO';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async saveProduct(createProductDTO: createProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDTO);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(id: string): Promise<Product> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    return this.productRepository.findOneBy({ id });
  }


}
