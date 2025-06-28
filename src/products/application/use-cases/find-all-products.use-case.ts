import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../ports/product-repository.interface';
import { PaginationDto } from 'src/common';
import { MetaDataAllProducts, Product } from 'src/products/domain';

@Injectable()
export class FindAllProductsUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: IProductRepository,
  ) {}

  execute(
    paginationDto: PaginationDto,
  ): Promise<{ data: Product[]; meta: MetaDataAllProducts }> {
    return this.repository.findAll(paginationDto);
  }
}
