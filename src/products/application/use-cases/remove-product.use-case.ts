import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../ports/product-repository.interface';
import { Product } from 'src/products/domain';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RemoveProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: IProductRepository,
  ) {}

  async execute(id: number): Promise<Product> {
    // Verificar que el producto existe
    const existingProduct = await this.repository.findById(id);
    if (!existingProduct) {
      throw new RpcException({
        message: 'Product with id ' + id + ' not found',
        status: HttpStatus.NOT_FOUND,
      });
    }

    // Eliminar el producto (soft delete)
    return await this.repository.softDelete(id);
  }
}
