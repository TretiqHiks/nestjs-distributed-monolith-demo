import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createProductDTO } from './dto/createProductDTO';
import { ProductService } from './product.service';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDTO: createProductDTO,
    @Res() response: Response,
  ) {
    try {
      const newProduct =
        await this.productService.createProduct(createProductDTO);
      response.status(HttpStatus.CREATED).json(newProduct);
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error creating a product!');
    }
  }

  @Get()
  async getAllProducts(@Res() response: Response) {
    try {
      const products = await this.productService.getAllProducts();
      response.status(HttpStatus.OK).json(products);
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error retrieving all products!');
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string, @Res() response: Response) {
    try {
      const product = await this.productService.getProductById(id);
      response.status(HttpStatus.OK).json(product);
    } catch (error) {
      console.log(error);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Product not found');
    }
  }
}
