import { HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { IProductRepository } from '../../application/ports/product-repository.interface';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Product } from '../../domain/entities/product.entity';
import { MetaDataAllProducts } from 'src/products/domain';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
    const created = await this.prisma.product.create({ data });
    return Product.fromPrisma(created);
  }

  async findAll(
    pagination: PaginationDto,
  ): Promise<{ data: Product[]; meta: MetaDataAllProducts }> {
    const { limit, page } = pagination;

    const [totalProducts, products] = await Promise.all([
      this.prisma.product.count({ where: { available: true } }),
      this.prisma.product.findMany({
        where: { available: true },
        skip: (page! - 1) * limit!,
        take: limit,
      }),
    ]);

    const lastPage = Math.ceil(totalProducts / limit!);

    return {
      meta: {
        totalProducts,
        page: page!,
        limit: limit!,
        totalPages: lastPage,
      },
      data: products.map((product) => Product.fromPrisma(product)),
    };
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id, available: true },
    });

    return product ? Product.fromPrisma(product) : null;
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id },
      data,
    });
    return Product.fromPrisma(updated);
  }

  async softDelete(id: number): Promise<Product> {
    const deleted = await this.prisma.product.update({
      where: { id },
      data: { available: false, deletedAt: new Date() },
    });
    return Product.fromPrisma(deleted);
  }

  async validateProducts(ids: number[]): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: ids },
        available: true,
      },
    });

    if (products.length !== ids.length) {
      const foundIds = products.map((product) => product.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));
      throw new RpcException({
        message: `Products with IDs ${notFoundIds.join(', ')} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return products.map((product) => Product.fromPrisma(product));
  }
}
