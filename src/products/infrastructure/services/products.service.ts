import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common';
import { FindAllProductsUseCase } from '../../application/use-cases/find-all-products.use-case';
import {
  CreateProductUseCase,
  CreateProductDto,
  UpdateProductDto,
  GetOneProductUseCase,
  UpdateProductUseCase,
  RemoveProductUseCase,
} from 'src/products/application';

@Injectable()
export class ProductsService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly getOneProductUseCase: GetOneProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly removeProductUseCase: RemoveProductUseCase,
  ) {}

  private readonly logger = new Logger('ProductsService');

  create(createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.findAllProductsUseCase.execute(paginationDto);
  }

  async findOne(id: number) {
    return await this.getOneProductUseCase.execute(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    if (!updateProductDto) {
      throw new BadRequestException('Update data is required');
    }

    return await this.updateProductUseCase.execute(id, updateProductDto);
  }

  async remove(id: number) {
    return await this.removeProductUseCase.execute(id);
  }
}
