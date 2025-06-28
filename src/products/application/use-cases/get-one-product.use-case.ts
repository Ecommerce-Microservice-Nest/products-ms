import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '../ports/product-repository.interface';
import { Product } from 'src/products/domain';

@Injectable()
export class GetOneProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: IProductRepository,
  ) {}

  async execute(id: number): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new NotFoundException('Product with id ' + id + ' not found');
    }
    return product;
  }
}
