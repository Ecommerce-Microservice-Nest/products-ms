import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger('ProductsService');

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

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
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id, available: true },
    });

    if (!product) {
      // this.logger.error(`Product with id ${id} not found`);
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
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
