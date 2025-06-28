import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import {
  CreateProductUseCase,
  FindAllProductsUseCase,
  GetOneProductUseCase,
  UpdateProductUseCase,
} from './application';
import {
  ProductsController,
  ProductsService,
  PrismaProductRepository,
} from './infrastructure';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    CreateProductUseCase,
    FindAllProductsUseCase,
    GetOneProductUseCase,
    UpdateProductUseCase,
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: PrismaProductRepository,
    },
  ],
  imports: [PrismaModule],
})
export class ProductsModule {}
