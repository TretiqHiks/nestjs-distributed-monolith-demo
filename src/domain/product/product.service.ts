import { Injectable } from '@nestjs/common';
import { createProductDTO } from './dto/createProductDTO';
import { ProductRepository } from './product.repository';
import { GetAllProductsDTO } from './dto/getAllProductsDTO';
import { GetProductDTO } from './dto/getProductDTO';
import { RabbitMQService } from '../../infrastructure/rabbitmq/rabbitmq.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly rabbitMqService: RabbitMQService,
  ) {}
  async createProduct(createProductDTO: createProductDTO) {
    try {
      const product =
        await this.productRepository.saveProduct(createProductDTO);
      await this.rabbitMqService.publish('product.created', product.id);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts() {
    const getAllProductsDTO = new GetAllProductsDTO();
    getAllProductsDTO.products = await this.productRepository.getAllProducts();
    return getAllProductsDTO;
  }

  async getProductById(id: string) {
    const dbProduct = await this.productRepository.getProductById(id);
    const getProductDTO = new GetProductDTO();
    getProductDTO.name = dbProduct.name;
    getProductDTO.description = dbProduct.description;
    getProductDTO.price = dbProduct.price;
    return getProductDTO;
  }
}
