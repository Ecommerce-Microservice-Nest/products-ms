import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '../ports/product-repository.interface';
import { Product } from 'src/products/domain';

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
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // Eliminar el producto (soft delete)
    return await this.repository.softDelete(id);
  }
}
