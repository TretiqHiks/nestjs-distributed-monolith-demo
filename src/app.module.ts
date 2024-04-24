import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductStockController } from './product-stock/product-stock.controller';
import { ProductStockService } from './product-stock/product-stock.service';

@Module({
  imports: [],
  controllers: [AppController, ProductController, ProductStockController],
  providers: [AppService, ProductService, ProductStockService],
})
export class AppModule {}
