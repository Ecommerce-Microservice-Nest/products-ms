import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../ports/product-repository.interface';

@Injectable()
export class ValidateProductsUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: IProductRepository,
  ) {}

  async execute(ids: number[]): Promise<number[]> {
    ids = Array.from(new Set(ids));

    const products = await this.repository.validateProducts(ids);

    return products.map((product) => product.id);
  }
}
