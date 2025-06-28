import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PaginationDto } from 'src/common';
import { FindAllProductsUseCase } from '../../application/use-cases/find-all-products.use-case';
import {
  CreateProductUseCase,
  CreateProductDto,
  UpdateProductDto,
  GetOneProductUseCase,
} from 'src/products/application';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly getOneProductUseCase: GetOneProductUseCase,
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

    await this.findOne(id);
    return await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.product.update({
      where: { id },
      data: { available: false, deletedAt: new Date() },
    });
  }
}
