import { ProductModule } from '../domain/product/product.module';
import { ProductStockModule } from '../domain/product-stock/product-stock.module';
import { CoreModule } from './core.module';

export const AppModules = [CoreModule, ProductModule, ProductStockModule];
