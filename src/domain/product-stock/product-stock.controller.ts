import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ProductStockService } from './product-stock.service';
import { Response } from 'express';

@Controller('product-stock')
export class ProductStockController {
  constructor(private readonly productStockService: ProductStockService) {}

  @Get('/:id')
  async getProductStockByProductId(
    @Param('id') product_id: string,
    @Res() response: Response,
  ) {
    try {
      const responseDTO =
        await this.productStockService.getProductStockByProductId(product_id);
      response.status(HttpStatus.OK).json(responseDTO);
    } catch (error) {
      console.log(error);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Product stock not found!');
    }
  }

  @Post('/addStock')
  async addStock(
    @Body('product_id') product_id: string,
    @Body('amount') amount: number,
    @Res() response: Response,
  ) {
    try {
      const responseDTO = await this.productStockService.addAmountToStock(
        product_id,
        amount,
      );
      response.status(HttpStatus.OK).json(responseDTO);
    } catch (error) {
      console.log(error);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Product stock not found!');
    }
  }
}
