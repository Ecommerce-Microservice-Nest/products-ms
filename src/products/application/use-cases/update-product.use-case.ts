import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';
import { IProductRepository } from '../ports/product-repository.interface';
import { Product } from 'src/products/domain';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: IProductRepository,
  ) {}

  async execute(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // Verificar que el producto existe
    const existingProduct = await this.repository.findById(id);
    if (!existingProduct) {
      throw new RpcException({
        message: 'Product with id ' + id + ' not found',
        status: HttpStatus.NOT_FOUND,
      });
    }

    // Actualizar el producto
    return await this.repository.update(id, updateProductDto);
  }
}
