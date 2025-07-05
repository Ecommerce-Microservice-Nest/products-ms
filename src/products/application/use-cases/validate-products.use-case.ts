import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../ports/product-repository.interface';
import { Product } from 'src/products/domain';

@Injectable()
export class ValidateProductsUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: IProductRepository,
  ) {}

  async execute(ids: number[]): Promise<Product[]> {
    ids = Array.from(new Set(ids));

    const products = await this.repository.validateProducts(ids);
    console.log('Validating products:', products);

    // return products.map((product) => product.id);
    return products;
  }
}
