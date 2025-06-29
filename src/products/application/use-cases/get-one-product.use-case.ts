import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../ports/product-repository.interface';
import { Product } from 'src/products/domain';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GetOneProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: IProductRepository,
  ) {}

  async execute(id: number): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new RpcException({
        message: 'Product with id ' + id + ' not found',
        status: HttpStatus.NOT_FOUND,
      });
    }
    return product;
  }
}
