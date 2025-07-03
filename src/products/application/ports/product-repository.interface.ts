import { PaginationDto } from 'src/common';
import { CreateProductDto } from 'src/products/application/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/application/dto/update-product.dto';
import { MetaDataAllProducts } from 'src/products/domain';

import { Product } from 'src/products/domain/entities/product.entity';

export interface IProductRepository {
  create(data: CreateProductDto): Promise<Product>;
  findAll(
    pagination: PaginationDto,
  ): Promise<{ data: Product[]; meta: MetaDataAllProducts }>;
  findById(id: number): Promise<Product | null>;
  update(id: number, data: UpdateProductDto): Promise<Product>;
  softDelete(id: number): Promise<Product>;
  validateProducts(ids: number[]): Promise<Product[]>;
}
