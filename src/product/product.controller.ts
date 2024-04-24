import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createProductDTO } from './dto/createProductDTO';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() createProductDTO: createProductDTO) {
    return createProductDTO;
  }

  @Get(':id')
  getProduct(@Param('id') id: string){
    return id;
  }
}
