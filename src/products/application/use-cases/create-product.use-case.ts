import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';

import { IProductRepository } from '../ports/product-repository.interface';
import { Product } from 'src/products/domain';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: IProductRepository,
  ) {}

  execute(createProductDto: CreateProductDto): Promise<Product> {
    return this.repository.create(createProductDto);
  }
}
